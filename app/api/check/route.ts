// POST /api/projects
import { prisma } from "@/utils/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, url, userId } = body;

  // Ping the website
  const response = await fetch(url, { method: 'GET' });
  const status = response.status;
  const statusText = response.statusText;

  // Save project to database
  const project = await prisma.projects.create({
    data: {
      name,
      url,
      userId 
    }
  });

  // Save ping to database
  const ping = await prisma.ping.create({
    data: {
      projectId: project.id,
      status: `${status} ${statusText}`, // Store both
    }
  });

  return NextResponse.json({
    project,
    ping,
    message: "Project and Ping created successfully!"
  });
}






export async function GET(req: NextRequest) {
  const projects = await prisma.projects.findMany({
    include: {
      ping: true, // include pings if you want
    },
  });

  return NextResponse.json(projects);
}

