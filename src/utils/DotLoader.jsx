import React from "react";

const DotLoader = () => {
  return (
    <div className="flex gap-2">
      <div className="w-2 h-2 rounded-full animate-bounce-150 bg-pink-600"></div>
      <div className="w-2 h-2 rounded-full animate-bounce bg-red-600"></div>
      <div className="w-2 h-2 rounded-full animate-bounce-150 bg-pink-600"></div>
      <div className="w-2 h-2 rounded-full animate-bounce-200 bg-red-600"></div>
      <div className="w-2 h-2 rounded-full animate-bounce-150 bg-pink-600"></div>
    </div>
  );
};

export default DotLoader;
