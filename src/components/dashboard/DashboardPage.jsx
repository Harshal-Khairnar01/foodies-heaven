import Image from "next/image";
import React from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import Link from "next/link";
import CategoryCard from "./CategoryCard";

const DashboardPage = () => {
  return (
    <div className="w-full mt-2 bg-transparent">
      <div className="w-full">
        <div className=" w-full lg:w-11/12 mx-auto flex flex-col lg:flex-row gap-2 p-4">
          <div className="w-full lg:w-2/3 order-2 lg:order-1">
            <div className="flex lg:mt-20 flex-col lg:p-10 p-1 rounded-md">
              <h2 className="lg:text-5xl text-2xl lg:p-4 p-1 leading-none font-bold text-red-500 text-shadow-[1px_1px_3px_#000000]">
                From Kitchen Creations to Heartfelt Traditions
              </h2>
              <h1 className="lg:mt-5 lg:px-6 lg:py-1 p-2 lg:text-4xl text-xl font-semibold text-gray-800">
                Welcome to{" "}
                <span
                  className="bg-gradient-to-r from-red-500 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradientxy"
                >
                  Foodies&apos; Heaven.
                </span>
              </h1>
              <p className="lg:px-6 font-bold p-3 lg:text-lg text-gray-950">
                The ultimate destination for culinary enthusiasts and home chefs.
                Ignite your passion for cooking and explore a world of flavors curated
                just for you. Join our vibrant community to share, create, and savor
                unforgettable recipes. Experience the joy of cooking like never before
                at Foodies&apos; Heaven.
              </p>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="w-full lg:w-1/3 order-1 lg:order-2 flex justify-center items-center">
            <div className="flex justify-center items-center rounded-lg overflow-hidden p-5">
              <Image
                src="/plate1.png"
                alt="home"
                width={400}
                height={100}
                priority
                className="animate-spin w-auto h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="lg:w-11/12 mx-auto p-2 w-full">
        <h1 className="text-3xl font-bold lg:px-16 lg:mt-3 text-center lg:text-left">
          Categories
        </h1>
        <div className="w-11/12 lg:px-4 lg:py-10 lg:gap-5 gap-8 grid lg:grid-cols-6 grid-cols-1 mx-auto mt-10 lg:mt-0">
          <CategoryCard img="/category/breakfast.png" category="Breakfast" cat="breakfast" />
          <CategoryCard img="/category/snacks.png" category="Snacks" cat="snacks" />
          <CategoryCard img="/category/meat.png" category="Meat" cat="meat" />
          <CategoryCard img="/category/dessert.png" category="Dessert & Cakes" cat="dessert" />
          <CategoryCard img="/category/lunch.png" category="Lunch" cat="lunch" />
          <CategoryCard img="/category/salad.png" category="Salad" cat="salad" />
        </div>
      </div>

      {/* Recipe Call-to-Action Section */}
      <div className="lg:w-10/12 w-11/12 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] mx-auto my-10 bg-white p-5 rounded-lg">
        <div className="w-full flex flex-col lg:flex-row gap-2">
          <div className="w-full lg:w-2/3 lg:p-4 p-1 order-2 lg:order-1">
            <div className="lg:p-2">
              <p className="font-semibold lg:text-xl text-gray-500">
                Let this platform be your canvas, and your ingredients be your
                palette. From intricate plating to rustic comfort food, every dish you
                share adds a brushstroke to the beautiful tapestry of our culinary
                community.
              </p>
            </div>

            <div className="lg:p-4 p-1 text-gray-400 lg:text-sm text-xs">
              &quot;Unleash your inner chef! Whether you&apos;re a seasoned cook or
              just starting out, everyone can become a chef on our platform.&quot;
            </div>
            <div className="p-1">
              <h1 className="lg:p-1 text-right lg:text-lg text-sm font-bold text-gray-600 lg:pl-20">
                Join us in this culinary adventure. Create an account and Publish your
                recipe for free!{" "}
              </h1>
              <h2 className="text-right text-xs font-semibold text-gray-800">
                Let&apos;s cook, create, and inspire together!
              </h2>
              <div className="flex justify-end mt-2">
                <Link href={`/recipes`}>
                  <h1 className="flex justify-center items-center bg-gradient-to-r font-bold from-red-50 to-red-300 text-red-700 rounded-2xl w-36 py-2 text-sm">
                    Explore Recipes{" "}
                    <FaAngleDoubleRight
                      size={16}
                      className="animate-fade-left-slow ml-1"
                    />
                  </h1>
                </Link>
              </div>
            </div>
          </div>

          {/* Chef Image */}
          <div className="w-full order-1 lg:order-2 lg:w-1/3">
            <div className="relative h-80 w-full">
              <Image
                src="/chef.png"
                alt="chef"
                fill
                className="object-contain animate-wiggle"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
