import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

export default function RF1({
  recipeData,
  handleChange,
  handleFileChange,
  activeHandler,
}) {
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  return (
    <div className="w-full lg:px-10 ">
      <div className="w-full flex justify-between gap-2 lg:gap-20 lg:flex-row flex-col lg:px-0 px-2 ">
        <div className="lg:w-3/5 w-full lg:my-20  order-2 lg:order-1 ">
          <div className="w-full gap-20 lg:flex justify-between items-center">
            <div className="mt-2 relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="title"
                placeholder=""
                id="title"
                className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-red-low focus:outline-none focus:ring-0 focus:border-red-low peer"
                value={recipeData.title}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="title"
                className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-500 peer-focus:dark:text-red-low peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Title
              </label>
            </div>

            <div className="lg:w-1/2 mt-2 relative z-0 mb-5 group">
              <select
                name="category"
                className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-red-low focus:outline-none focus:ring-0 focus:border-red-low peer"
                onChange={handleChange}
                value={recipeData.category}
                id="category"
              >
                <option value="" disabled></option>
                <option value="breakfast">BreakFast</option>
                <option value="snacks">Snacks</option>
                <option value="meat">Meat</option>
                <option value="dessert">Dessert & Cakes</option>
                <option value="lunch">Lunch</option>
                <option value="salad">Salad</option>
              </select>
              <label
                htmlFor="category"
                className={`flex gap-4 px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform ${
                  recipeData.category ? "-translate-y-6 scale-75" : ""
                } top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-500 peer-focus:dark:text-red-low peer-placeholder-shown:scale-100 ${
                  recipeData.category
                    ? "peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    : ""
                }`}
              >
                Select A Category <IoMdArrowDropdown size={20} />
              </label>
            </div>
          </div>
          <div className="mt-2 relative z-0 w-full mb-5 group">
            <textarea
              rows="4"
              type="text"
              name="description"
              placeholder=""
              id="description"
              className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-red-low focus:outline-none focus:ring-0 focus:border-red-low peer"
              value={recipeData.description}
              onChange={handleChange}
              required
            ></textarea>
            <label
              htmlFor="description"
              className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-500 peer-focus:dark:text-red-low peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Description
            </label>
          </div>

          <div className="w-full gap-20 lg:flex justify-between items-center mt-10">
            <div className="lg:w-1/2 mt-2 relative z-0 mb-5 group">
              <select
                name="region"
                className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-red-low focus:outline-none focus:ring-0 focus:border-red-low peer"
                onChange={handleChange}
                value={recipeData.region}
                id="region"
              >
                <option value="" disabled></option>
                <option value="Gujarati">Gujarati Cuisine</option>
                <option value="Punjabi">Punjabi Cuisine</option>
                <option value="Kashmiri">Kashmiri Cuisine</option>
                <option value="Rajasthani">Rajasthani Cuisine</option>
                <option value="Maharashtrian">Maharashtrian Cuisine</option>
                <option value="Bangali">Bangali Cuisine</option>
                <option value="South Indian">South Indian</option>
                <option value="Hyderabadi">Hyderabadi Cuisine</option>
              </select>
              <label
                htmlFor="region"
                className={`flex gap-4 px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform ${
                  recipeData.region ? "-translate-y-6 scale-75" : ""
                } top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-500 peer-focus:dark:text-red-low peer-placeholder-shown:scale-100 ${
                  recipeData.region
                    ? "peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    : ""
                }`}
              >
                Region <IoMdArrowDropdown size={20} />
              </label>
            </div>
            <div className="lg:w-1/2 mt-2 relative z-0 mb-5 group">
              <select
                name="type"
                className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-red-low focus:outline-none focus:ring-0 focus:border-red-low peer"
                onChange={handleChange}
                value={recipeData.type}
                id="type"
              >
                <option value="" disabled></option>
                <option value="vegetarian">Vegetarian</option>
                <option value="non-vegetarian">Non-vegetarian</option>
              </select>
              <label
                htmlFor="type"
                className={`flex gap-4 px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform ${
                  recipeData.type ? "-translate-y-6 scale-75" : ""
                } top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-500 peer-focus:dark:text-red-low peer-placeholder-shown:scale-100 ${
                  recipeData.type
                    ? "peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    : ""
                }`}
              >
                Select Type <IoMdArrowDropdown size={20} />
              </label>
            </div>
          </div>
        </div>
        <div className="lg:w-2/5 w-full flex justify-center items-center order-1 lg:order-2">
          <div>
            <div className="w-full">
              <input
                type="file"
                accept="image/*"
                id="file"
                className="hidden"
                onChange={onFileChange}
              />
              <label
                htmlFor="file"
                className={`w-full min-h-[10vh] dark:border-white p-3 flex justify-center items-center ${
                  dragging ? "bg-blue-500" : "bg-transparent"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {recipeData?.thumbnail ? (
                  <img
                    src={recipeData.thumbnail}
                    alt={recipeData.title}
                    className="max-h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-black dark:text-white border-2 border-black p-4">
                    Drag and drop your thumbnail here or click browse
                  </span>
                )}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-end">
          <button
            onClick={activeHandler}
            type="submit"
            className="w-40 font-bold my-2 mt-6 p-2 text-white bg-red-500 rounded hover:bg-red-600 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[rgba(0,_0,_0,_0.5)_0px_5px_10px]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
