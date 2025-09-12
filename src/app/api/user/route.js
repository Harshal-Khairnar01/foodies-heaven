import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    if (!user || !user.isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get("user") || "";
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 4;
    const skip = (page - 1) * limit;

    const whereClause = searchTerm
      ? {
          OR: [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { email: { contains: searchTerm, mode: "insensitive" } },
          ],
        }
      : {};

    const count = await prisma.user.count({
      where: whereClause,
    });

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
      where: whereClause,
      take: limit,
      skip: skip,
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ users, count }, { status: 200 });
  } catch (err) {
    console.error("API error", err);
    return NextResponse.json(
      { message: err.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    if (!user || !user.isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userIdToDelete = searchParams.get("id");

    if (!userIdToDelete) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const userToDelete = await prisma.user.findUnique({
      where: { id: userIdToDelete },
    });

    if (!userToDelete) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await prisma.$transaction([
      prisma.recipe.deleteMany({
        where: { userId: userIdToDelete },
      }),
      prisma.user.delete({
        where: { id: userIdToDelete },
      }),
    ]);

    return NextResponse.json(
      { message: "User and associated recipes deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("API error", err);
    return NextResponse.json(
      { message: err.message || "Server error" },
      { status: 500 }
    );
  }
}
