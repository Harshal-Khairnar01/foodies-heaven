

import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { message: "Recipe ID is required" },
        { status: 400 }
      );
    }

    const recipe = await prisma.recipe.findUnique({
      where: {
        id: id,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true, 
          },
        },
      },
    });

    if (!recipe) {
      return NextResponse.json(
        { message: "Recipe not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ recipe }, { status: 200 });
  } catch (err) {
    console.error("API error", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}