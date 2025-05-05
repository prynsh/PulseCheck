
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

  const response = await fetch(url, { method: 'GET' });
  const status = response.status;
  const statusText = response.statusText;

  const project = await prisma.projects.create({
    data: {
      name,
      url,
      userId: user.id,
      discordEnabled,
      discordUrl,
    }
  });

  const ping = await prisma.ping.create({
    data: {
      projectId: project.id,
      status: `${status} ${statusText}`,
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

