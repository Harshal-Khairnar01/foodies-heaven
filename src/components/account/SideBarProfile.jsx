// SideBarProfile.jsx

"use client";

import Image from "next/image";
import React from "react";
import avatarDefault from "../../../public/chef.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { GiCookingPot } from "react-icons/gi";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings, MdOutlinePostAdd } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import Link from "next/link";

// Accept setLogoutOpen as a prop
const SideBarProfile = ({ user, active, avatar, setActive, setLogoutOpen }) => {
  return (
    <div className="w-[70px] sm:w-[220px] bg-gray-300 h-screen border-r-2 border-gray-600 shadow-sm flex flex-col items-center sm:items-start transition-all duration-300 py-5">
      <div
        className={`flex items-center gap-3 w-full px-5 py-4 cursor-pointer ${
          active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={user.image || avatarDefault}
          alt={user.username || "user"}
          className="border-2 border-black cursor-pointer rounded-full w-[30px] h-[30px]"
          width={30}
          height={30}
        />
        <h5 className="hidden sm:block dark:text-white text-black">
          My Account
        </h5>
      </div>

      <div
        className={`flex items-center gap-3 w-full px-5 py-4 my-2 cursor-pointer transition-all duration-300 ${
          active === 2 ? "bg-white shadow-md" : "hover:bg-gray-200"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={22} className="text-gray-700" />
        <h5 className="hidden sm:block text-black">Change Password</h5>
      </div>

      <div
        className={`flex items-center gap-3 w-full px-5 py-4 my-2 cursor-pointer transition-all duration-300 ${
          active === 3 ? "bg-white shadow-md" : "hover:bg-gray-200"
        }`}
        onClick={() => setActive(3)}
      >
        <GiCookingPot size={22} className="text-gray-700" />
        <h5 className="hidden sm:block text-black">My Recipes</h5>
      </div>

      <div
        className={`flex items-center gap-3 w-full px-5 py-4 my-2 cursor-pointer transition-all duration-300 ${
          active === 4 ? "bg-white shadow-md" : "hover:bg-gray-200"
        }`}
        onClick={() => setActive(4)}
      >
        <MdOutlinePostAdd size={22} className="text-gray-700" />
        <h5 className="hidden sm:block text-black">Add Recipe</h5>
      </div>

      {user.role === "admin" && (
        <Link
          href={"/admin"}
          className="flex items-center gap-3 w-full px-5 py-4 my-2 cursor-pointer transition-all duration-300 hover:bg-gray-200"
        >
          <MdOutlineAdminPanelSettings size={22} className="text-gray-700" />
          <h5 className="hidden sm:block text-black">Admin Dashboard</h5>
        </Link>
      )}

      <Link
        href={"/"}
        className="flex items-center gap-3 w-full px-5 py-4 my-2 cursor-pointer transition-all duration-300 hover:bg-gray-200"
      >
        <FaHome size={22} className="text-gray-700" />
        <h5 className="hidden sm:block text-black">Go to Home</h5>
      </Link>

      <button
        className={`flex items-center gap-3 w-full px-5 py-4 my-2 cursor-pointer transition-all duration-300 ${
          active === 5 ? "bg-white shadow-md" : "hover:bg-gray-200"
        }`}
        onClick={() => setLogoutOpen(true)} // Use the passed setter
      >
        <AiOutlineLogout size={22} className="text-gray-700" />
        <h5 className="hidden sm:block text-black">Log Out</h5>
      </button>
    </div>
  );
};

export default SideBarProfile;