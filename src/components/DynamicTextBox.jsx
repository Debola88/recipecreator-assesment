"use client";
import React from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import Button from "./Button";
import { useState } from "react";
import { useContext } from "react";
import {
  FormProvider,
  RecipeContext,
} from "../contexts/recipecontext/RecipeContext";

const DynamicTextBox = () => {
  const { formData, setFormData } = useContext(RecipeContext);

  return (
    <div className="flex flex-col items-center mt-8">
      {formData.ingredients.map((ingredient, index) => (
        <div
          key={index}
          className="bg-white w-full rounded flex items-center mt-4"
        >
          {/* <FaEnvelope className="text-gray-400" /> */}
          <input
            type="text"
            name="ingredient"
            value={ingredient}
            onChange={({ target }) => {
              formData.ingredients[index] = target.value;
              setFormData({
                ...formData,
              });
            }}
            className="w-full rounded md:text-lg bg-gray-100 p-2 outline-none h-10 flex-1"
            placeholder={`Ingridient ${index + 1}`}
          required />
          <button
            onClick={() => {
              setFormData({
                ...formData,
                ingredients: formData.ingredients.filter(
                  (ing, i) => i !== index
                ),
              });
            }}
            className="bg-red-500 text-white p-3 ml-2 rounded"
          >
            <RiDeleteBinFill />
          </button>
        </div>
      ))}
      <div
        className="pt-10"
        onClick={() =>
          setFormData({
            ...formData,
            ingredients: [...formData.ingredients, ""],
          })
        }
      >
        <Button className="rounded mt-10">Add more Ingredient</Button>
      </div>
    </div>
  );
};

export default DynamicTextBox;
