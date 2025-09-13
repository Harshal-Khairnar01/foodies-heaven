import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const { category } = params;
    const recipes = await prisma.recipe.findMany({
      where: { category: category.toLowerCase() },
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify({ success: true, recipes }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 }
    );
  }
}
