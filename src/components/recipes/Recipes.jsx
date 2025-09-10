"use client";

import React, { useEffect, useState } from "react";
import RecipeContainer from "./RecipeContainer";
import { useSearchParams } from "next/navigation";
import Search from "@/utils/Search";
import Pagination from "@/utils/Pagination";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const recipe = searchParams.get("recipe") || "";

  const ITEM_PER_PAGE = process.env.PAGE_ITEM_AT_RECIPE_PAGE || 3;

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/recipe?page=${page}&limit=${ITEM_PER_PAGE}&recipe=${recipe}`
      );
      const data = await res.json();
      if (res.ok) {
        setRecipes(data.recipes);
        setCount(data.count);
      }
    } catch (error) {
      console.error("Failed to fetch recipes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [page, recipe]);

  return (
    <>
      <div className="w-11/12 mx-auto flex lg:justify-end p-2">
        <Search
          className="bg-[#2e374a] text-white"
          placeholder="Search recipe.."
        />
      </div>
      <div className="mx-auto w-11/12">
        <h2 className="text-4xl lg:text-6xl font-bold p-2 my-2 text-gray-900">
          Explore Recipes
        </h2>
        <h3 className="text-xl lg:text-3xl p-3 font-semibold">
          Discover, Prepare, and Savor Your Culinary Creations
        </h3>
      </div>
      {loading ? (
        <p className="text-center text-lg my-8">Loading recipes...</p>
      ) : (
        <div className="lg:mt-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full lg:gap-12 gap-2 lg:px-8 lg:py-6 p-3">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeContainer key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <p className="text-center text-lg col-span-3">No recipes found</p>
          )}
        </div>
      )}
      <div className="w-9/12 mx-auto lg:mb-7">
        <Pagination count={count} ITEM_PER_PAGE={ITEM_PER_PAGE} />
      </div>
    </>
  );
};

export default Recipes;
