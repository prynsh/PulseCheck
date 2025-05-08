
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
        userId:user.id
      },
      include:{
        ping:true
      }
  });

  return NextResponse.json(projects);
}

