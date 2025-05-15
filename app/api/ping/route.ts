import { NextResponse } from "next/server";
import { prisma } from "@/constants/client";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function GET() {
  try {
    const projects = await prisma.projects.findMany({
      include: {
        user: true,
      },
    });

    for (const project of projects) {
      try {
        const res = await fetch(project.url);
        const status = res.status;
        const statusText = res.statusText;

        await prisma.ping.create({
          data: {
            projectId: project.id,
            status: `${status} ${statusText}`,
          },
        });

        console.log(`✅ Pinged ${project.name}: ${status} ${statusText}`);

        if (status !== 200 && project.user?.email) {
          await sgMail.send({
            to: project.user.email,
            from: process.env.SENDGRID_FROM_EMAIL!, 
            subject: `⚠️ ${project.name} is down`,
            html: `
              <p><strong>${project.name}</strong> returned <code>${status} ${statusText}</code>.</p>
              <p>Check your project: <a href="${project.url}">${project.url}</a></p>
            `,
          });

          console.log(`📧 Alert sent to ${project.user.email}`);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";

        await prisma.ping.create({
          data: {
            projectId: project.id,
            status: `Error: ${errorMessage}`,
          },
        });

        console.error(`❌ Error pinging ${project.name}:`, errorMessage);

        if (project.user?.email) {
          await sgMail.send({
            to: project.user.email,
            from: process.env.SENDGRID_FROM_EMAIL!,
            subject: `❌ Failed to ping ${project.name}`,
            html: `
              <p><strong>${project.name}</strong> could not be reached.</p>
              <p>Error: ${errorMessage}</p>
              <p>Project URL: <a href="${project.url}">${project.url}</a></p>
            `,
          });

          console.log(`📧 Error alert sent to ${project.user.email}`);
        }
      }
    }

    return NextResponse.json({ message: "Pinged all projects" });
  } catch (error) {
    console.error("Error in /api/ping-all:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
