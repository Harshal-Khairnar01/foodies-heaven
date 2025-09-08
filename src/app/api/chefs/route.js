import { NextResponse } from "next/server";


export async function GET() {
  try {
    const chefs = await prisma.user.findMany({
      where: {
        emailVerified: {
          not: null, 
        },
      },
      select: {
        id: true,
        username: true,
        email: true,
        image: true,
      },
    });

    return NextResponse.json({ user: chefs }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch chefs:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
