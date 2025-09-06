"use client";

import React from "react";
import { FiX } from "react-icons/fi";

const CustomModal = ({ open, setOpen, component: Component, setRoute }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg bg-gray-900 p-6 shadow-xl">
        <div className="flex justify-end">
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <FiX size={24} />
          </button>
        </div>
        <div className="mt-4">
          <Component setOpen={setOpen} setRoute={setRoute} />
        </div>
      </div>
    </div>
  );
};

export default CustomModal;