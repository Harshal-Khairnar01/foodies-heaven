"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import RF1 from "./RF1";
import RF2 from "./RF2";
import RF3 from "./RF3";
import { uploadToBlob } from "@/utils/uploadToBlob";

export default function RecipeForm({ refetch }) {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);

  const RECIPE_INITIAL = {
    title: "",
    description: "",
    category: "",
    region: "",
    type: "",
    ingredients: [{ name: "", quantity: "" }],
    recipe: [{ step: "" }],
    thumbnail: "",
    prepTime: "",
    cookTime: "",
    difficulty: "",
    tags: [],
    notes: "",
  };

  const [recipeData, setRecipeData] = useState(RECIPE_INITIAL);
  const [imageFile, setImageFile] = useState(null);

  const activeHandler = () => {
    const { title, category, description, region, type } = recipeData;
    if (
      !title.trim() ||
      !category ||
      !description.trim() ||
      !region ||
      !type ||
      !imageFile
    ) {
      toast.error("Please fill out all fields and upload an image.");
      return;
    }
    setActive((prevActive) => prevActive + 1);
  };

  const activeHandler2 = () => {
    if (
      recipeData.ingredients.length === 0 ||
      recipeData.ingredients.some(
        (ingredient) => !ingredient.name.trim() || !ingredient.quantity.trim()
      )
    ) {
      toast.error("Please add at least one valid ingredient.");
      return;
    }

    if (
      recipeData.recipe.length === 0 ||
      recipeData.recipe.some((step) => !step.step.trim())
    ) {
      toast.error("Please add at least one valid instruction step.");
      return;
    }
    setActive((prevActive) => prevActive + 1);
  };

  const prevChange = () => {
    setActive((prevActive) => prevActive - 1);
  };

  const removeIngredient = (indexToRemove) => {
    setRecipeData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const removeStep = (indexToRemove) => {
    setRecipeData((prev) => ({
      ...prev,
      recipe: prev.recipe.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setRecipeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...recipeData.ingredients];
    newIngredients[index][field] = value;
    setRecipeData((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const handleStepChange = (index, field, value) => {
    const newStep = [...recipeData.recipe];
    newStep[index][field] = value;
    setRecipeData((prev) => ({ ...prev, recipe: newStep }));
  };

  const addIngredient = () => {
    const lastIngredient =
      recipeData.ingredients[recipeData.ingredients.length - 1];
    if (!lastIngredient.name.trim() || !lastIngredient.quantity.trim()) {
      toast.error("First, complete the previous ingredient!");
      return;
    }
    setRecipeData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", quantity: "" }],
    }));
  };

  const addStep = () => {
    const lastStep = recipeData.recipe[recipeData.recipe.length - 1];
    if (!lastStep.step.trim()) {
      toast.error("First, complete this step!");
      return;
    }
    setRecipeData((prev) => ({
      ...prev,
      recipe: [...prev.recipe, { step: "" }],
    }));
  };

  const handleTagChange = (tag) => {
    setRecipeData((prev) => ({
      ...prev,
      tags: [...new Set([...prev.tags, tag])],
    }));
  };

  const handleTagRemove = (tagToRemove) => {
    setRecipeData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleFileChange = (file) => {
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setRecipeData((prev) => ({ ...prev, thumbnail: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitHandler = async () => {
    setLoading(true);
    try {
      let uploadedImageUrl = recipeData.thumbnail;

      if (imageFile) {
        const { url } = await uploadToBlob(imageFile);
        uploadedImageUrl = url;
      }

      const payload = {
        ...recipeData,
        thumbnail: uploadedImageUrl,
        userId: "clz4b72740000a6g6b9d6a2k9",
      };

      const response = await axios.post("/api/recipes", payload);

      if (response.status === 201) {
        toast.success("Recipe added successfully!");
        setRecipeData(RECIPE_INITIAL);
        setImageFile(null);
        setActive(0);
        if (typeof refetch === "function") refetch();
      } else {
        toast.error("Failed to add recipe");
      }
    } catch (err) {
      console.error("Recipe Submit Error:", err);
      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative w-full  ">
        <div className="flex flex-col p-3  w-full lg:rounded-lg  ">
          {active === 0 && (
            <RF1
              recipeData={recipeData}
              handleChange={handleChange}
              handleFileChange={handleFileChange}
              activeHandler={activeHandler}
            />
          )}
          {active === 1 && (
            <RF2
              recipeData={recipeData}
              removeIngredient={removeIngredient}
              addIngredient={addIngredient}
              handleIngredientChange={handleIngredientChange}
              removeStep={removeStep}
              addStep={addStep}
              handleStepChange={handleStepChange}
              onSubmitHandler={activeHandler2}
              prevChange={prevChange}
            />
          )}
          {active === 2 && (
            <RF3
              recipeData={recipeData}
              handleChange={handleChange}
              onSubmitHandler={onSubmitHandler}
              prevChange={prevChange}
              handleTagChange={handleTagChange}
              handleTagRemove={handleTagRemove}
            />
          )}
        </div>
      </div>

      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/60 z-50">
          <div
            aria-label="Loading..."
            role="status"
            className="flex items-center space-x-2 bg-white p-4 rounded-lg"
          >
            <span className="text-xl font-bold text-red-600 animate-duration-[2000ms]">
              Adding Recipe
            </span>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full animate-bounce bg-red-600"></div>

              <div className="w-2 h-2 rounded-full animate-bounce-150 bg-pink-600"></div>

              <div className="w-2 h-2 rounded-full animate-bounce-200 bg-red-600"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
