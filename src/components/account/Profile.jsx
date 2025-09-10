// Profile.jsx

"use client";
import React, { useState, useEffect } from "react";
import SideBarProfile from "./SideBarProfile";
import ChangePassword from "./ChangePassword";
import ProfileInfo from "./ProfileInfo";
import RecipeForm from "./RecipeForm";
import RecipeContainer from "./RecipeContainer";
import ConfirmModal from "@/utils/ConfirmModal"; // Import the modal here
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { signOut } from "next-auth/react";

const Profile = ({ user }) => {
  const [active, setActive] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [count, setCount] = useState(0);
  const [logoutOpen, setLogoutOpen] = useState(false); // Move state here
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get("page")) || 1;
  const recipe = searchParams.get("recipe") || "";

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`/api/recipes?userId=${user.id}`);
        setRecipes(res.data.recipes);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };
    if (user?.id) {
      fetchRecipes();
    }
  }, [user?.id, count]);

  const refetchRecipes = () => {
    setCount((prev) => prev + 1);
  };

  const logoutHandler = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <div className="flex w-full min-h-screen">
        <div className="bg-opacity-90 shadow-sm sticky top-0 h-screen">
          <SideBarProfile
            user={user}
            active={active}
            setActive={setActive}
            avatar={avatar}
            setLogoutOpen={setLogoutOpen} // Pass the setter to the sidebar
          />
        </div>

        <div className="w-full h-screen overflow-y-auto">
          {active === 1 && (
            <div className="w-full h-screen bg-transparent flex justify-center items-center">
              <ProfileInfo user={user} avatar={avatar} />
            </div>
          )}
          {active === 2 && (
            <div className="w-full h-screen bg-transparent flex justify-center items-center">
              <ChangePassword />
            </div>
          )}
          {active === 3 && (
            <div className="w-full mt-20">
              <div className="w-11/12 mx-auto flex lg:justify-end">Search Bar</div>
              <div className="mt-10 w-full pl-7 px-2 800px:px-10 800px:pl-8">
                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px]">
                  {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                      <RecipeContainer key={recipe._id} recipe={recipe} />
                    ))
                  ) : (
                    <h1 className="text-center text-[18px] font-Poppins">
                      You don&apos;t have any Recipes!
                    </h1>
                  )}
                </div>
              </div>
              <div className="w-9/12 mx-auto lg:mb-7">Pagination</div>
            </div>
          )}
          {active === 4 && (
            <div className="w-full">
              <RecipeForm refetch={refetchRecipes} />
            </div>
          )}
        </div>
      </div>
      {/* Render the modal outside of the main layout div */}
      <ConfirmModal
        open={logoutOpen}
        setOpen={setLogoutOpen}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        onConfirm={logoutHandler}
        confirmText="Logout"
        cancelText="Cancel"
      />
    </>
  );
};

export default Profile;