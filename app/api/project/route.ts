
import { prisma } from "@/constants/client";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });

  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: token.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const body = await req.json();
  const { name, url, discordEnabled, discordUrl } = body;


  const project = await prisma.projects.create({
    data: {
      name,
      url,
      userId: user.id,
      discordEnabled,
      discordUrl,
    }
  });

  

  return NextResponse.json({
    project,
    message: "Project and Ping created successfully!"
  });
}



export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: token.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const projects = await prisma.projects.findMany({
    where: {
      userId: user.id,
    },
    include: {
      ping: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });

  return NextResponse.json(projects);
}


export async function DELETE(req: NextRequest) {
  const token = await getToken({ req });

  if (!token?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: token.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
  }

  const project = await prisma.projects.findFirst({
    where: {
      id: parseInt(id),
      userId: user.id,
    },
  });

  if (!project) {
    return NextResponse.json({ error: "Project not found or unauthorized" }, { status: 404 });
  }

  await prisma.ping.deleteMany({
    where: { projectId: project.id },
  });

  await prisma.projects.delete({
    where: { id: project.id },
  });

  return NextResponse.json({ message: "Project deleted successfully" });
}
