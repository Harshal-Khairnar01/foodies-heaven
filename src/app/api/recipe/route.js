import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const recipeQuery = searchParams.get("recipe") || "";
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 3;
    const userId = searchParams.get("userId");

    const skip = (page - 1) * limit;
    const take = limit;

    let whereCondition = {
      OR: [
        { title: { contains: recipeQuery, mode: "insensitive" } },
        { description: { contains: recipeQuery, mode: "insensitive" } },
      ],
    };

    if (userId) {
      whereCondition.userId = userId;
    }

    const recipes = await prisma.recipe.findMany({
      where: whereCondition,
      orderBy: { createdAt: "desc" },
      skip: skip,
      take: take,
    });

    const count = await prisma.recipe.count({
      where: whereCondition,
    });

    return NextResponse.json({ recipes, count }, { status: 200 });
  } catch (err) {
    console.error("API error", err);
    return NextResponse.json(
      { message: err.message || "Server error" },
      { status: 500 }
    );
  }
}

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


export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const recipeId = searchParams.get("id");

    if (!recipeId) {
      return NextResponse.json(
        { message: "Recipe ID is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!recipe) {
      return NextResponse.json(
        { message: "Recipe not found" },
        { status: 404 }
      );
    }

    if (recipe.userId !== user.id) {
      return NextResponse.json(
        { message: "Forbidden: You are not the owner of this recipe" },
        { status: 403 }
      );
    }

    await prisma.recipe.delete({
      where: { id: recipeId },
    });

    return NextResponse.json(
      { message: "Recipe deleted successfully" },
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