// Profile.jsx

"use client";
import React, { useState, useEffect } from "react";
import SideBarProfile from "./SideBarProfile";
import ChangePassword from "./ChangePassword";
import ProfileInfo from "./ProfileInfo";
import RecipeForm from "./RecipeForm";
import ConfirmModal from "@/utils/ConfirmModal";

import { signOut } from "next-auth/react";
import UserRecipes from "./UserRecipes"; 

const Profile = ({ user }) => {
  const [active, setActive] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [logoutOpen, setLogoutOpen] = useState(false);

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
            setLogoutOpen={setLogoutOpen}
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
            <UserRecipes user={user} /> 
          )}
          {active === 4 && (
            <div className="w-full">
              <RecipeForm />
            </div>
          )}
        </div>
      </div>
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