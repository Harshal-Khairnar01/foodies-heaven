import React from "react";
import { IoMdArrowDropdown, IoIosRemoveCircleOutline } from "react-icons/io";

export default function RF3({
  recipeData,
  handleChange,
  onSubmitHandler,
  prevChange,
  handleTagChange,
  handleTagRemove,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      handleTagChange(e.target.value.trim());
      e.target.value = "";
    }
  };

  return (
    <div className="w-full lg:mt-20 lg:px-10">
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-x-10 lg:gap-y-4 w-full">
        <div className="mt-2 relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="prepTime"
            placeholder=""
            id="prepTime"
            className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-low focus:outline-none focus:ring-0 focus:border-red-low peer"
            value={recipeData.prepTime || ""}
            onChange={handleChange}
          />
          <label
            htmlFor="prepTime"
            className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-500 peer-focus:dark:text-red-low peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Preparation Time (e.g., 20 mins)
          </label>
        </div>

        <div className="mt-2 relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="cookTime"
            placeholder=""
            id="cookTime"
            className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-low focus:outline-none focus:ring-0 focus:border-red-low peer"
            value={recipeData.cookTime || ""}
            onChange={handleChange}
          />
          <label
            htmlFor="cookTime"
            className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-500 peer-focus:dark:text-red-low peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Cooking Time (e.g., 45 mins)
          </label>
        </div>

        <div className="lg:w-1/2 mt-2 relative z-0 mb-5 group w-full">
          <select
            name="difficulty"
            className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-low focus:outline-none focus:ring-0 focus:border-red-low peer"
            onChange={handleChange}
            value={recipeData.difficulty || ""}
            id="difficulty"
          >
            <option value="" disabled></option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <label
            htmlFor="difficulty"
            className={`flex gap-4 px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform ${
              recipeData.difficulty ? "-translate-y-6 scale-75" : ""
            } top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-500 peer-focus:dark:text-red-low peer-placeholder-shown:scale-100 ${
              recipeData.difficulty
                ? "peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                : ""
            }`}
          >
            Difficulty <IoMdArrowDropdown size={20} />
          </label>
        </div>

        <div className="mt-2 relative z-0 w-full mb-5 group">
          <input
            type="text"
            placeholder="Type and press Enter to add tags"
            id="tags"
            className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-low focus:outline-none focus:ring-0 focus:border-red-low peer"
            onKeyDown={handleKeyDown}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {recipeData.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300 cursor-pointer"
                onClick={() => handleTagRemove(tag)}
              >
                {tag}
                <IoIosRemoveCircleOutline className="inline-block ml-1" />
              </span>
            ))}
          </div>
        </div>

        <div className="mt-2 relative z-0 w-full mb-5 group">
          <textarea
            rows="4"
            name="notes"
            placeholder=""
            id="notes"
            className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-low focus:outline-none focus:ring-0 focus:border-red-low peer"
            value={recipeData.notes || ""}
            onChange={handleChange}
          ></textarea>
          <label
            htmlFor="notes"
            className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-red-500 peer-focus:dark:text-red-low peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Additional Notes
          </label>
        </div>
      </div>

      <div className="w-full">
        <div className="flex justify-between mt-5 gap-5 px-4 w-full">
          <button
            onClick={prevChange}
            className="md:w-40 font-bold my-2 mt-6 p-2 text-white bg-red-500 rounded hover:bg-red-600 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[rgba(0,_0,_0,_0.5)_0px_5px_10px]"
          >
            Prev
          </button>
          <button
            onClick={onSubmitHandler}
            type="submit"
            className="md:w-40 font-bold my-2 mt-6 p-2 text-white bg-red-500 rounded hover:bg-red-600 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[rgba(0,_0,_0,_0.5)_0px_5px_10px]"
          >
            Submit Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
