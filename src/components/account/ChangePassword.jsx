"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword)
      return toast.error("All fields are required");
    if (newPassword.length < 6)
      return toast.error("Password must be at least 6 characters");
    if (newPassword !== confirmPassword)
      return toast.error("Passwords do not match");

    try {
      await axios.put("/api/user/change-password", {
        oldPassword,
        newPassword,
      });
      toast.success("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <div className="w-10/12 md:w-8/12 lg:w-6/12 mx-auto my-6 bg-white shadow-lg rounded-2xl p-6">
      <h1 className="text-2xl md:text-3xl font-semibold text-center pb-4 text-black ">
        Change Password
      </h1>
      <form
        onSubmit={passwordChangeHandler}
        className="flex flex-col items-center"
      >
        <div className="w-full md:w-[80%] lg:w-[60%] mt-5 relative">
          <label className="block text-gray-700  mb-1">
            Enter Your Password
          </label>
          <div className="relative">
            <input
              type={showOld ? "text" : "password"}
              className="w-full px-4 py-2 border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-[#37a39a] "
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            {showOld ? (
              <AiOutlineEye
                className="absolute top-5 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
                size={20}
                onClick={() => setShowOld(false)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="absolute top-5 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
                size={20}
                onClick={() => setShowOld(true)}
              />
            )}
          </div>
        </div>

        <div className="w-full md:w-[80%] lg:w-[60%] mt-5">
          <label className="block text-gray-700  mb-1">
            Enter Your New Password
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              className="w-full px-4 py-2 border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-[#37a39a] "
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {showNew ? (
              <AiOutlineEye
                className="absolute top-5 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
                size={20}
                onClick={() => setShowNew(false)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="absolute top-5 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
                size={20}
                onClick={() => setShowNew(true)}
              />
            )}
          </div>
        </div>

        <div className="w-full md:w-[80%] lg:w-[60%] mt-5 relative">
          <label className="block text-gray-700  mb-1">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              className="w-full px-4 py-2 border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-[#37a39a] "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {showConfirm ? (
              <AiOutlineEye
                className="absolute top-5 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
                size={20}
                onClick={() => setShowConfirm(false)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="absolute top-5 right-3 transform -translate-y-1/2 cursor-pointer text-gray-600"
                size={20}
                onClick={() => setShowConfirm(true)}
              />
            )}
          </div>
        </div>

        <input
          type="submit"
          value="Update Password"
          className="w-full md:w-[250px] py-2 bg-[#37a39a] text-white font-semibold rounded-md shadow-md cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg mt-8"
        />
      </form>
    </div>
  );
};

export default ChangePassword;
