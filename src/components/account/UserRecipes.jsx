// UserRecipes.jsx

"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Pagination from "@/utils/Pagination";
import Search from "@/utils/Search";
import { FaTrash } from "react-icons/fa";
import ConfirmModal from "@/utils/ConfirmModal";
import Link from "next/link";

const UserRecipes = ({ user }) => {
  const [recipes, setRecipes] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipeToDeleteId, setRecipeToDeleteId] = useState(null);

  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;
  const recipe = searchParams.get("recipe") || "";
  const ITEM_PER_PAGE = 3;

  const fetchUserRecipes = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/recipe?userId=${user.id}&page=${page}&recipe=${recipe}&limit=${ITEM_PER_PAGE}`
      );
      if (res.data) {
        setRecipes(res.data.recipes);
        setCount(res.data.count);
      }
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRecipes();
  }, [user?.id, page, recipe]);

  const handleOpenModal = (recipeId) => {
    setRecipeToDeleteId(recipeId);
    setIsModalOpen(true);
  };

  const onConfirmDelete = async () => {
    try {
      await axios.delete(`/api/recipe?id=${recipeToDeleteId}`);

      setIsModalOpen(false);
      setRecipeToDeleteId(null);
      fetchUserRecipes();
    } catch (error) {
      console.error("Failed to delete recipe:", error);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="w-full mt-10  md:px-20">
      <div className="w-11/12 mx-auto flex lg:justify-end">
        <Search
          className="bg-[#2e374a] text-white"
          placeholder="search recipe.."
        />
      </div>
      <div className="mt-10 w-full lg:px-2 800px:px-10 800px:pl-8">
        {loading ? (
          <p className="text-center text-lg">Loading recipes...</p>
        ) : (
          <ul className="space-y-4">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <li
                  key={recipe.id}
                  className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md"
                >
                  <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md">
                    {recipe.thumbnail ? (
                      <img
                        src={recipe.thumbnail}
                        alt={recipe.title}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex-grow ml-4">
                    <Link
                      href={`/recipes/${recipe.id}`}
                      className="text-xl font-bold text-gray-900  cursor-pointer"
                    >
                      {recipe.title}
                    </Link>
                    <p className="text-gray-600">
                      <span className="font-semibold">Type:</span> {recipe.type}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Category:</span>{" "}
                      {recipe.category}
                    </p>
                  </div>
                  <button
                    onClick={() => handleOpenModal(recipe.id)}
                    className="flex-shrink-0 text-red-500 hover:text-red-700 transition-colors duration-200"
                    aria-label={`Delete ${recipe.title}`}
                  >
                    <FaTrash size={24} />
                  </button>
                </li>
              ))
            ) : (
              <h1 className="text-center text-[18px] font-Poppins text-gray-700">
                You don&apos;t have any Recipes!
              </h1>
            )}
          </ul>
        )}
      </div>
      <div className="w-9/12 mx-auto lg:mb-7 mt-4">
        <Pagination count={count} ITEM_PER_PAGE={ITEM_PER_PAGE} />
      </div>

      <ConfirmModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        onConfirm={onConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this recipe? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default UserRecipes;
