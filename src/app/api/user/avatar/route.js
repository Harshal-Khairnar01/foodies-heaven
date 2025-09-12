import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { image } = await request.json();
    if (!image) return NextResponse.json({ message: "Image URL required" }, { status: 400 });

    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: { image },
    });

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update avatar" }, { status: 500 });
  }
}
