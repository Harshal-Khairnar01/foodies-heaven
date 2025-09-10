import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const required = [
      "title",
      "description",
      "category",
      "region",
      "type",
      "ingredients",
      "recipe",
    ];
    for (const key of required) {
      if (!body[key]) {
        return NextResponse.json(
          { message: `Missing field: ${key}` },
          { status: 400 }
        );
      }
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    const newRecipe = await prisma.recipe.create({
      data: {
        title: body.title,
        description: body.description,
        thumbnail: body.thumbnail || null,
        userId: user.id,
        category: body.category,
        region: body.region,
        type: body.type,
        ingredients: body.ingredients.map((ing) => ({
          name: ing.name,
          quantity: ing.quantity,
        })),
        recipe: body.recipe.map((s) => ({ step: s.step })),
        prepTime: body.prepTime || null,
        cookTime: body.cookTime || null,
        difficulty: body.difficulty || null,
        tags: body.tags || [],
        notes: body.notes || null,
      },
    });

    return NextResponse.json({ recipe: newRecipe }, { status: 201 });
  } catch (err) {
    console.error("API error", err);
    return NextResponse.json(
      { message: err.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "Missing userId" }, { status: 400 });
    }

    const recipes = await prisma.recipe.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ recipes }, { status: 200 });
  } catch (err) {
    console.error("API error", err);
    return NextResponse.json(
      { message: err.message || "Server error" },
      { status: 500 }
    );
  }
}
