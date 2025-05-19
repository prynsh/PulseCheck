import { prisma } from "@/constants/client";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params; 
  const projectId = Number(params.id);

  const project = await prisma.projects.findUnique({
    where: { id: projectId },
    include: {
      ping: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json({
    project: {
      id: project.id,
      name: project.name,
    },
    pings: project.ping,
  });
}
