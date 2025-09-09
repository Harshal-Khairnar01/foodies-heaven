"use client";

import React from "react";
import { FiX } from "react-icons/fi";

const CustomModal = ({
  open,
  setOpen,
  component: Component,
  setRoute,
  origin,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[10000] p-4">
      <div className="relative w-[400px] rounded-lg bg-white p-4 shadow-xl z-[10001]">
        <div className="flex justify-end">
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-gray-800 transition-colors duration-200"
          >
            <FiX size={24} />
          </button>
        </div>
        <div className="mt-2">
          <Component setOpen={setOpen} setRoute={setRoute} origin={origin} />
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
