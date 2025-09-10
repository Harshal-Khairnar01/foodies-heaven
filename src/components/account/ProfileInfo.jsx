"use client";
import React, { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import avatarIcon from "../../../public/chef.png";
import axios from "axios";
import ImageUpload from "./ImageUpload";
import { useSession } from "next-auth/react";
import { FaCamera } from "react-icons/fa";

const ProfileInfo = ({ user }) => {
  const { data: session, update } = useSession();
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || avatarIcon);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpdate = async (uploadedUrl) => {
    try {
      setIsLoading(true);
      const { data } = await axios.put("/api/user/avatar", {
        image: uploadedUrl,
      });

      if (data.success) {
        setImage(data.user.image);
        await update({ image: data.user.image });
        toast.success("Profile picture updated!");
      } else {
        toast.error(data.message || "Failed to update avatar");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Name cannot be empty!");

    try {
      setIsLoading(true);
      const response = await axios.put("/api/user/profile", { name });

      if (response.data.success) {
        const updatedUser = response.data.user;
        setName(updatedUser.name);
        await update({
          name: updatedUser.name,
          image: updatedUser.image,
        });
        toast.success(response.data.message || "Profile updated successfully!");
      } else {
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Profile Update Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-10/12 md:w-8/12 lg:w-6/12 mx-auto my-6 bg-white dark:bg-[#5b40e1] shadow-lg rounded-2xl p-6">
      <div className="w-full flex justify-center">
        <div className="relative group">
          {isLoading ? (
            <div className="w-[130px] h-[130px] flex items-center justify-center border-4 border-[#37a39a] rounded-full bg-gray-200">
              <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <Image
              src={image || avatarIcon}
              alt={name}
              width={130}
              height={130}
              className="w-[130px] h-[130px] border-4 border-[#37a39a] rounded-full object-contain shadow-md transition-transform duration-300 transform group-hover:scale-105"
            />
          )}

          <div className="absolute bottom-2 right-2 p-2 bg-[#37a39a] text-white rounded-full shadow-md hover:bg-[#2e8f85] transition-colors duration-300">
            <ImageUpload returnUrl={handleImageUpdate}>
              <FaCamera size={16} />
            </ImageUpload>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="w-full md:w-[80%] lg:w-[60%] mx-auto">
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#37a39a] dark:bg-gray-700 dark:text-white"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="text"
              readOnly
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
              value={user?.email || ""}
            />
          </div>

          <button
            type="submit"
            className={`w-full md:w-[250px] py-2 bg-[#37a39a] text-white font-semibold rounded-md shadow-md ${
              isLoading
                ? "cursor-not-allowed opacity-70"
                : "transition-transform transform hover:scale-105 hover:shadow-lg"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfo;
