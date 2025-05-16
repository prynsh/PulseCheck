import { NextResponse } from "next/server";
import { prisma } from "@/constants/client";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

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

        // Only enqueue if status !== 200
        if (status !== 200) {
          const notification = {
            projectName: project.name,
            status: `${status} ${statusText}`,
            url: project.url,
            email: project.user?.email || null,
            discord: project?.discordUrl, 
            type: "ping-failed",
          };
          console.log(JSON.stringify(notification))
          await redis.lpush("queue:notifications", JSON.stringify(notification));
          console.log(`📥 Enqueued alert for ${project.name}`);
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

        const notification = {
          projectName: project.name,
          status: `Error: ${errorMessage}`,
          url: project.url,
          email: project.user?.email || null,
          discord: project?.discordUrl,
          type: "ping-error",
        };

        await redis.lpush("queue:notifications", JSON.stringify(notification));
        console.log(`📥 Enqueued error alert for ${project.name}`);
      }
    }

    return NextResponse.json({ message: "Pinged all projects" });
  } catch (error) {
    console.error("Error in /api/ping-all:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
