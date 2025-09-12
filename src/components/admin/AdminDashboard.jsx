"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ConfirmModal from "@/utils/ConfirmModal";
import UserRecipes from "../account/UserRecipes";
import { FaUsers, FaUtensils, FaBars, FaTimes, FaHome } from "react-icons/fa";
import Link from "next/link";
import AllUsers from "./AllUsers";
import Loader from "../Loader";
import { CgMenuRightAlt } from "react-icons/cg";

const AdminDashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState(null);
  const [activeTab, setActiveTab] = useState("users");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const recipesRes = await axios.get("/api/user");
      setRecipes(recipesRes.data.recipes);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (message, action) => {
    setModalMessage(message);
    setModalAction(() => action);
    setIsModalOpen(true);
  };

  const handleConfirmAction = async () => {
    if (modalAction) {
      setLoading(true);
      try {
        await modalAction();
      } catch (err) {
        console.error("Deletion failed:", err);
        setError("Failed to delete item. Please try again.");
      } finally {
        setLoading(false);
        setIsModalOpen(false);
      }
    }
  };

  const handleDeleteUser = (userId) => {
    handleOpenModal(
      `Are you sure you want to delete this user? All their recipes will also be deleted.`,
      async () => {
        await axios.delete(`/api/user?id=${userId}`);
      }
    );
  };

  const handleDeleteRecipe = (recipeId) => {
    handleOpenModal(
      "Are you sure you want to delete this recipe? This action cannot be undone.",
      async () => {
        await axios.delete(`/api/recipe?id=${recipeId}`);
      }
    );
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-bold text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className=" w-full grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-screen bg-gray-100">
      <div
        className={`fixed md:sticky top-0 left-0 h-full w-64 md:w-[250px] bg-white shadow-lg md:shadow-none transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center p-5 border-b md:hidden">
          <h2 className="text-xl font-bold text-gray-700">Admin Menu</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <FaTimes className="text-gray-700 text-2xl" />
          </button>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <Link
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition bg-gray-100 text-gray-700 hover:bg-gray-200`}
            href={"/"}
          >
            <FaHome size={22} className="text-gray-700" />
            <h5>Go to Home</h5>
          </Link>
          <button
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === "users"
                ? "bg-red-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => {
              setActiveTab("users");
              setSidebarOpen(false);
            }}
          >
            <FaUsers className="text-lg" /> Manage Users
          </button>
          <button
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeTab === "recipes"
                ? "bg-red-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => {
              setActiveTab("recipes");
              setSidebarOpen(false);
            }}
          >
            <FaUtensils className="text-lg" /> Manage Recipes
          </button>
        </div>
      </div>

      <div className="flex-1 p-2">
        <div className="flex items-center justify-between mb-6 md:hidden">
         
          <button
            className="text-gray-700 text-2xl"
            onClick={() => setSidebarOpen(true)}
          >
            <CgMenuRightAlt/>
          </button>
        </div>

        {activeTab === "users" && (
          <div className=" bg-gray-300 rounded-xl shadow-lg  px-2 md:p-2">
            <AllUsers handleDeleteUser={handleDeleteUser} />
          </div>
        )}

        {activeTab === "recipes" && (
          <div className=" bg-gray-300 rounded-xl shadow-lg px-2  md:p-2">
            <UserRecipes
              isAdmin={true}
              onRecipeDeleteSuccess={() => fetchData()}
            />
          </div>
        )}
      </div>

      {isModalOpen && (
        <ConfirmModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          onConfirm={handleConfirmAction}
          message={modalMessage}
          title="Confirm Deletion"
          confirmText="Delete"
          cancelText="Cancel"
        />
      )}
    </div>
  );
};

export default AdminDashboard;
