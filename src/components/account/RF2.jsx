import React from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";

export default function RF2({
  recipeData,
  removeIngredient,
  addIngredient,
  removeStep,
  addStep,
  handleIngredientChange,
  handleStepChange,
  onSubmitHandler,
  prevChange,
}) {
  return (
    <div className="w-full lg:px-10 lg:my-20">
      <div className="w-full">
        <div className="w-full p-2 grid lg:grid-cols-3 grid-cols-1 lg:gap-x-10 lg:gap-y-4">
          {recipeData.ingredients.map((ingredient, index) => (
            <div key={index} className="w-full flex items-center gap-2 lg:gap-3">
              <div className="mt-2 relative z-0 mb-5 group w-full">
                <input
                  type="text"
                  placeholder=""
                  id="in-name"
                  className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-low focus:outline-none focus:ring-0 focus:border-red-low peer"
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientChange(index, "name", e.target.value)
                  }
                  required
                />
                <label
                  htmlFor="in-name"
                  className="lg:px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-500 peer-focus:dark:text-red-low peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Ingredient Name
                </label>
              </div>

              <div className="mt-2 relative z-0 mb-5 group">
                <input
                  type="text"
                  placeholder=""
                  id="in-qty"
                  className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-low focus:outline-none focus:ring-0 focus:border-red-low peer"
                  value={ingredient.quantity}
                  onChange={(e) =>
                    handleIngredientChange(index, "quantity", e.target.value)
                  }
                  required
                />
                <label
                  htmlFor="in-qty"
                  className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-500 peer-focus:dark:text-red-low peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Quantity
                </label>
              </div>

              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className={`flex justify-center items-center text-red-500 ${
                  recipeData.ingredients.length === 1
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={recipeData.ingredients.length === 1}
              >
                <IoIosRemoveCircleOutline size={25} />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addIngredient}
          className="-mt-3 w-40 p-2 text-white bg-red-500 rounded hover:bg-red-600 text-xs"
        >
          Add Another Ingredient
        </button>

        <div className="grid grid-cols-2 gap-x-5">
          {recipeData.recipe.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="mt-3 relative z-0 w-full mb-5 group">
                <textarea
                  rows="1"
                  type="text"
                  placeholder=""
                  id="step"
                  className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-low focus:outline-none focus:ring-0 focus:border-red-low peer"
                  value={step.step}
                  onChange={(e) =>
                    handleStepChange(index, "step", e.target.value)
                  }
                  required
                ></textarea>
                <label
                  htmlFor="step"
                  className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-500 peer-focus:dark:text-red-low peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Instruction {index + 1}
                </label>
              </div>

              <button
                type="button"
                onClick={() => removeStep(index)}
                className={`flex justify-center items-center text-red-500 ${
                  recipeData.recipe.length === 1
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={recipeData.recipe.length === 1}
              >
                <IoIosRemoveCircleOutline size={25} />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addStep}
          className="-mt-3 w-40 p-2 text-white bg-red-500 rounded hover:bg-red-600 text-xs"
        >
          Add Another Instruction
        </button>
      </div>

      <div className="w-full">
        <div className="flex justify-between mt-5 gap-5 px-4">
          <button
            onClick={prevChange}
            className="w-1/2 md:w-40 font-bold my-2 mt-6 p-2 text-white bg-red-500 rounded hover:bg-red-600 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[rgba(0,_0,_0,_0.5)_0px_5px_10px]"
          >
            Prev
          </button>
          <button
            onClick={onSubmitHandler}
            type="button"
            className="w-1/2 md:w-40 font-bold my-2 mt-6 p-2 text-white bg-red-500 rounded hover:bg-red-600 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[rgba(0,_0,_0,_0.5)_0px_5px_10px]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
