"use client";

import React from "react";
import CustomModal from "@/utils/CustomModal";

const ConfirmModal = ({
  open,
  setOpen,
  title = "Confirm Action",
  message = "Are you sure?",
  onConfirm,
  confirmText = "Yes",
  cancelText = "No",
}) => {
  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      component={() => (
        <div className="p-6 text-center text-gray-900">
          <h2 className="text-lg font-semibold mb-4">{title}</h2>
          <p className="mb-6">{message}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                onConfirm && onConfirm();
                setOpen(false);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              {confirmText}
            </button>
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              {cancelText}
            </button>
          </div>
        </div>
      )}
    />
  );
};

export default ConfirmModal;
