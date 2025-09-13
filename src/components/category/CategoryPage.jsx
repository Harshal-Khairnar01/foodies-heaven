"use client";

import { useParams } from "next/navigation";

import CategoryHeader from "./CategoryHeader";
import TarditionCard from "./TraditionCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DotLoader from "@/utils/DotLoader";

const categories = {
  breakfast: {
    desc: "Start your day with a burst of energy and a symphony of flavors with our delightful breakfast recipes. From wholesome bowls of creamy oats topped with vibrant fruits to fluffy pancakes drizzled with golden syrup, each dish is a celebration of mornings filled with promise and possibility. Whether you're rushing to conquer the day ahead or indulging in a leisurely weekend brunch, our breakfast creations are designed to nourish your body and uplift your spirits. So, rise and shine with us as we embark on a culinary journey that transforms ordinary mornings into extraordinary beginnings.",
    img: "/category/breakfast.png",
    title: "Breakfast",
  },
  snacks: {
    desc: "Embrace the joy of snacking with our irresistible collection of savory and sweet treats. Whether you're craving a crunchy bite to fuel your afternoon or seeking a satisfying nibble to accompany your evening unwind, our snack recipes offer the perfect balance of flavor, texture, and satisfaction. From crispy homemade chips seasoned to perfection to decadent chocolate truffles that melt in your mouth, each bite is a moment of pure indulgence. So, forget the guilt and embrace the pleasure as you dive into a world of delicious snacks that elevate every snacking experience to new heights.",
    img: "/category/snacks.png",
    title: "Snacks",
  },
  dessert: {
    desc: "Satisfy your sweet tooth and indulge your senses with our heavenly assortment of desserts and cakes. From rich and decadent chocolate creations that delight the palate to light and airy confections that dance on the taste buds, our recipes are a celebration of all things sweet and sublime. Whether you're marking a special occasion or simply treating yourself to a moment of pure indulgence, our desserts promise to dazzle, delight, and leave you craving for more. So, let go of inhibitions, surrender to temptation, and immerse yourself in a world of sweet delights that bring joy and happiness with every luscious bite.",
    img: "/category/dessert.png",
    title: "Dessert and Cakes",
  },
  lunch: {
    desc: "Elevate your midday meals with our inspired collection of lunch recipes that redefine the art of dining. From hearty soups and sandwiches that warm the soul to vibrant salads and grain bowls bursting with fresh flavors, our lunch creations are a testament to the beauty of simple ingredients prepared with passion and creativity. Whether you're enjoying a leisurely meal at home or packing a nutritious lunch for the office, our recipes offer a delicious escape from the ordinary and a chance to savor the moment with every savory bite.",
    img: "/category/lunch.png",
    title: "Lunch",
  },
  salad: {
    desc: "Experience the vibrant colors, crisp textures, and bold flavors of our refreshing salad recipes that elevate greens from mere sides to star attractions. Whether you're seeking a light and refreshing meal on a hot summer day or looking to add a burst of freshness to your dinner table, our salads are a celebration of seasonal produce and inventive combinations. From zesty citrus salads that awaken the taste buds to hearty grain salads that satisfy the appetite, each dish is a feast for the senses that nourishes the body and delights the palate. So, embrace the beauty of simplicity and savor the goodness of nature with every vibrant salad creation.",
    img: "/category/salad.png",
    title: "Salad",
  },
  meat: {
    desc: "Are you craving an unforgettable dining experience? Dive into our tantalizing collection of meat-centric recipes that are sure to excite your taste buds and leave you craving more. From succulent steak dinners to juicy burgers bursting with flavor, our curated selection celebrates the richness and versatility of meat. Indulge in tender roasted chicken infused with aromatic herbs or savor the robust flavors of slow-cooked barbecue ribs that fall off the bone. Whether you're a fan of hearty stews, zesty tacos, or elegant roast dinners, our diverse array of meat recipes offers something to satisfy every carnivorous craving. Elevate your cooking game and delight your senses wit",
    img: "/category/meat.png",
    title: "Meat",
  },
};

export default function Page() {
  const params = useParams();
  const category = params?.category;

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryData = categories[category] || null;

  useEffect(() => {
    if (!category) return;

    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/recipe/category/${category}`);

        if (res.data.success) {
          setRecipes(res.data.recipes);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [category]);

  if (!categoryData) {
    return (
      <div className="text-center text-gray-600 mt-24">
        <h2 className="text-2xl font-bold">Category Not Found</h2>
        <p>Sorry, the category you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white">
        <CategoryHeader
          content={categoryData.desc}
          img={categoryData.img}
          title={categoryData.title}
        />
        {loading ? (
          <div className=" w-full flex justify-center items-center h-[300px]">
           <DotLoader/>
          </div>
        ) : (
          <div className="w-11/12 mx-auto p-5 gap-y-16 grid lg:grid-cols-4 grid-cols-1">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <TarditionCard recipe={recipe} key={recipe.id} />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No recipes found in this category.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
