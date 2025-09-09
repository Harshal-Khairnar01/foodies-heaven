import React from "react";
import { uploadToBlob } from "@/utils/uploadToBlob";

const ImageUpload = ({ returnUrl, children }) => {
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const { url } = await uploadToBlob(file);
    returnUrl(url);
  };

  return (
    <label className="cursor-pointer">
      {children}
      <input type="file" onChange={handleImageUpload} hidden accept="image/*" />
    </label>
  );
};

export default ImageUpload;
