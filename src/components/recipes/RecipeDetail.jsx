"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { GiSpoon } from "react-icons/gi";
import { FaTags } from "react-icons/fa6";
import Loader from "../Loader";

const RecipeDetail = ({ id }) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/recipe/${id}`);
        setRecipe(response.data.recipe);
      } catch (err) {
        console.error("Failed to fetch recipe:", err);
        setError(err.message || "An error occurred while fetching the recipe.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-2xl font-bold text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-2xl font-bold text-red-500">
        Recipe not found.
      </div>
    );
  }

  return (
    <>
      <div className="w-full  bg-bgWhite flex justify-center items-center">
        <div className="w-full md:w-11/12 lg:w-11/12 mx-auto flex flex-col">
          <div className="w-full mx-auto flex flex-col lg:flex-row md:flex-col gap-2">
            <div className="w-full lg:w-2/3 lg:py-8 px-4 order-2 lg:order-1">
              <div className="lg:p-1">
                <div>
                  <h1 className="px-4 lg:px-0 text-3xl lg:text-5xl font-extrabold lg:py-2 text-red-500 mb-5 lg:mb-1">
                    {recipe.title}
                  </h1>
                </div>
                <div
                  className="px-5 bg-red-00 lg:my-10 py-5 rounded-xl shadow-[0_35px_60px_-15px_#ff9494] animate-fade animate-delay-200 bg-gray-700"
                  style={{
                    backgroundImage: `url("/desc.png")`,
                    backgroundSize: "cover",
                  }}
                >
                  <h2 className="p-2 font-semibold text-gray-200 ">
                    {recipe.description}
                  </h2>
                  {recipe.user && (
                    <div className="h-24">
                      <div className="w-full flex items-center p-5">
                        <div className="relative w-16 h-16">
                          <Image
                            alt={recipe.user?.name || "Chef's Avatar"}
                            src={recipe.user?.image || "/chef.png"}
                            className="rounded-full border-gray-400 border-2"
                            style={{ objectFit: "cover" }}
                            fill
                          />
                        </div>
                        <div className="mx-2 flex flex-col px-4 py-2">
                          <span className="gap-1 font-semibold text-gray-400 flex text-sm items-center">
                            <GiForkKnifeSpoon size={15} />
                            Chef
                          </span>
                          <span className="lg:text-xl text-lg font-bold text-gray-400">
                            {recipe.user?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="gap-4 lg:gap-1 flex flex-col lg:flex-row md:flex-col lg:p-2 lg:justify-between lg:items-center">
                    <div className="px-4 py-2 flex items-center gap-2 font-semibold text-gray-200">
                      Creation Date:
                      <h1 className="text-gray-400">
                        {moment(recipe.createdAt).format("MMMM D, YYYY")}
                      </h1>
                    </div>
                    <div className="flex flex-col md:justify-between md:w-9/12 lg:w-auto md:mx-5 md:gap-6 gap-2 lg:gap-1 px-2 py-3 md:p-5 bg-gradient-to-t  from-gray-400 to-white lg:mx-4 rounded-md text-bgWhite text-sm md:text-md">
                      <div className="lg:px-4 px-3 flex items-center gap-3 lg:gap-2 font-semibold">
                        Category:{" "}
                        <h1 className="font-bold">{recipe.category}</h1>
                      </div>
                      <div className="lg:px-4 px-3 flex items-center gap-3 lg:gap-2 font-semibold">
                        Type: <h1 className="font-bold">{recipe.type}</h1>
                      </div>
                      <div className="lg:px-4 px-3 flex items-center gap-3 lg:gap-2 font-semibold">
                        Region: <h1 className="font-bold">{recipe.region}</h1>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-10 justify-between p-2">
                  <div className="w-full mx-auto my-5 rounded-lg grid lg:grid-cols-3 md:grid-cols-2 md:gap-4 grid-cols-1 lg:gap-5 gap-3 mb-5 lg:px-5 px-3">
                    <div className=" bg-white  text-gray-500 flex flex-col justify-center items-center rounded-md py-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
                      <FaRegClock size={40} />
                      <h2 className="text-lg text-left lg:px-3 px-6 font-bold text-gray-900">
                        Prep Time
                      </h2>
                      <h2 className="px-8 lg:text-sm font-semibold text-gray-700 lg:py-1">
                        {recipe.prepTime || "N/A"}
                      </h2>
                    </div>
                    <div className=" bg-white  text-gray-500 flex flex-col justify-center items-center rounded-md py-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
                      <FaRegClock size={40} />
                      <h2 className="text-lg text-left lg:px-3 px-6 font-bold text-gray-900">
                        Cook Time
                      </h2>
                      <h2 className="px-8 lg:text-sm font-semibold text-gray-700 lg:py-1">
                        {recipe.cookTime || "N/A"}
                      </h2>
                    </div>
                    <div className=" bg-white text-gray-500 flex flex-col justify-center items-center rounded-md py-4 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
                      <GiSpoon size={40} />
                      <h2 className="text-lg text-left lg:px-3 px-6 font-bold text-gray-900">
                        Difficulty
                      </h2>
                      <h2 className="px-8 lg:text-sm font-semibold text-gray-700 lg:py-1">
                        {recipe.difficulty || "N/A"}
                      </h2>
                    </div>
                  </div>

                  <h1 className="font-bold text-3xl p-2 mt-5 text-gray-600">
                    Ingredients
                  </h1>
                  <div className="w-full mx-auto rounded-lg grid lg:grid-cols-3 md:grid-cols-2 md:gap-4 grid-cols-1 lg:gap-5 gap-3 mb-5 lg:px-5 px-3">
                    {recipe.ingredients?.map((ingredient, index) => (
                      <div
                        key={index}
                        className="bg-White text-red-500 flex flex-col justify-between rounded-md py-2 shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]"
                      >
                        <h2 className="text-lg text-left lg:px-3 px-6 font-bold ">
                          {ingredient.name}
                        </h2>
                        <h2 className="text-right px-8 lg:text-sm font-semibold lg:py-1">
                          {ingredient.quantity}
                        </h2>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-9/12 md:mx-auto lg:w-1/3 lg:h-[650px] flex justify-center items-center lg:sticky lg:top-14 order-1 lg:order-2">
              <div className="w-full overflow-hidden p-5 md:p-10">
                <Image
                  className="rounded-xl"
                  src={recipe.thumbnail || "/chef.png"}
                  alt={recipe.title || "recipe"}
                  width={200}
                  height={200}
                  layout="responsive"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 justify-between p-2 lg:mb-10 mb-5">
            <h1 className="font-bold text-4xl p-2 text-gray-600">
              Instructions
            </h1>
            <div
              className="p-2 rounded-md shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]"
              style={{
                backgroundImage: `url("/step2.png")`,
                backgroundSize: "cover",
              }}
            >
              {recipe.recipe?.map((step, index) => (
                <div key={index} className="px-4 py-2 my-1 rounded-lg">
                  <h1 className="font-semibold text-xl">
                    Instruction {index + 1}
                  </h1>
                  <p className="p-3 text-lg font-bold">
                    <FaArrowRightLong size={17} className="inline-block ml-6" />{" "}
                    {step.step}
                  </p>
                </div>
              ))}
            </div>
            {recipe.notes && (
              <div
                className="p-5 rounded-xl shadow-[0_35px_60px_-15px_#ff9494] animate-fade animate-delay-200 bg-gray-700"
                style={{
                  backgroundImage: `url("/desc.png")`,
                  backgroundSize: "cover",
                }}
              >
                <h2 className="text-2xl font-bold text-gray-200 mb-2">Notes</h2>
                <p className="font-semibold text-gray-300">{recipe.notes}</p>
              </div>
            )}

            {recipe.tags && recipe.tags.length > 0 && (
              <div className="flex flex-col gap-5 justify-between p-2">
                <h1 className="font-bold text-3xl p-2 mt-5 text-gray-600">
                  Tags
                </h1>
                <div className="flex flex-wrap gap-2 px-3 lg:px-5">
                  {recipe.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold"
                    >
                      <FaTags size={15} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetail;
