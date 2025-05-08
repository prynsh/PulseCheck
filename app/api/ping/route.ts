import { NextResponse } from "next/server";
import { prisma } from "@/constants/client";

export async function GET() {
  try {
    const projects = await prisma.projects.findMany();

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
      } catch (err) {
        await prisma.ping.create({
          data: {
            projectId: project.id,
            status: `Error: ${err instanceof Error ? err.message : "Unknown"}`,
          },
        });

        console.error(`❌ Error pinging ${project.name}:`, err);
      }
    }

    return NextResponse.json({ message: "Pinged all projects" });
  } catch (error) {
    console.error("Error in /api/ping-all:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
