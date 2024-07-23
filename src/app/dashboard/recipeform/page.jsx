"use client";
import React, { useState } from "react";
import { doc, addDoc, collection } from "firebase/firestore";
import { db, firebase } from "@/app/config/firebase";
import { getAuth } from "firebase/auth";
import Button from "@/components/Button";
import DynamicInputForm from "@/components/DynamicInputForm";
import DynamicTextBox from "@/components/DynamicTextBox";
import UploadBox from "@/components/UploadBox";
import StyledSelect from "@/components/StyledSelect";
import SuccessModal from "@/components/SuccessModal";
import { RecipeContext } from "@/contexts/recipecontext/RecipeContext";

const RecipeForm = () => {
  const auth = getAuth(firebase);
  const user = auth.currentUser;

  const categoryOptions = [
    { value: "breakfast-recipes", label: "Breakfast recipes" },
    { value: "lunch-recipes", label: "Lunch recipes" },
    { value: "dinner-recipes", label: "Dinner recipes" },
    { value: "appetizer-recipes", label: "Appetizer recipes" },
    { value: "salad-recipes", label: "Salad recipes" },
    { value: "main-course-recipes", label: "Main-course recipes" },
    { value: "side-dish-recipes", label: "Side-dish recipes" },
    { value: "baked-goods-recipes", label: "Baked-goods recipes" },
    { value: "snack-recipes", label: "Snack recipes" },
    { value: "dessert-recipes", label: "Dessert recipes" },
    { value: "soup-recipes", label: "Soup recipes" },
    { value: "holiday-recipes", label: "Holiday recipes" },
  ];

  const [formData, setFormData] = useState({
    title: "",
    share: "",
    ingredients: [""],
    instructions: [{ instruction: "", images: [] }],
    image: null,
    category: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCategoryChange = (selectedValue) => {
    setFormData({
      ...formData,
      category: selectedValue,
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form data:", formData);
      const docRef = await addDoc(collection(db, "recipes"), {
        ...formData,
        userId: user.uid,
      });
      console.log("Document written with ID: ", docRef.id);
      setIsModalOpen(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  React.useEffect(() => {
    console.log("Form Data", formData);
  }, [formData]);


  return (
    <RecipeContext.Provider
      value={{ formData, setFormData, handleChange, handleSubmit }}
    >
      <form
        className="min-h-screen max-md:px-5 py-20 flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <UploadBox />
        <div className="text-center bg-white rounded-2xl shadow-2xl flex items-center justify-center max-md:flex-col w-full max-w-4xl">
          <div className="p-10 md:py-12 md:px-20 w-full">
            <h2 className="text-green-500 text-3xl font-bold mb-2">
              Upload Recipe
            </h2>
            <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
            <p className="mb-2 text-sm mt-10 text-gray-400">
              Fill all the information
            </p>
            <div className="flex flex-col items-center mt-8">
              <div className="bg-gray-100 w-full rounded flex items-center px-2">
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  value={formData.title}
                  className="w-full rounded md:text-lg bg-gray-100 p-2 outline-none h-10 flex-1"
                  placeholder="Title: My best-ever soup"
                  required
                />
              </div>
              <div className="bg-gray-100 w-full rounded flex mt-4 mb-4 items-center px-2">
                <textarea
                  name="share"
                  onChange={handleChange}
                  value={formData.share}
                  className="w-full rounded md:text-lg bg-gray-100 p-2 outline-none h-32 flex-1"
                  placeholder="Share a little more about this dish. what or who inspired you to cook it? What makes it special to you? What is your favorite way to eat it?"
                ></textarea>
              </div>
              <div className="w-full">
                <StyledSelect
                  name="category"
                  value={formData.category}
                  onChange={handleCategoryChange}
                  options={categoryOptions}
                  placeholder="Select a category"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-10 bg-white rounded-2xl shadow-2xl flex items-center justify-center max-md:flex-col w-full max-w-4xl">
          <div className="p-10 md:py-12 md:px-20 w-full">
            <h2 className="font-semibold text-2xl text-green-500">
              Ingredients
            </h2>
            <DynamicTextBox />
          </div>
        </div>
        <div className="text-center mt-10 bg-white rounded-2xl shadow-2xl flex items-center justify-center max-md:flex-col w-full max-w-4xl">
          <div className="p-10 md:py-12 md:px-20 w-full">
            <h2 className="font-semibold text-2xl text-green-500">
              Recipe Instructions
            </h2>
            <DynamicInputForm />
          </div>
        </div>
        <div className="py-10 max-w-4xl w-full text-right text-black">
          <button
            type="submit"
            className="py-4 px-3 w-full rounded bg-green-500 hover:bg-white border-2 border-green-500 hover:text-green-500 transition-all duration-300 text-white font-semibold"
          >
            Save Recipe
          </button>
        </div>
      </form>
      <SuccessModal isOpen={isModalOpen} closeModal={closeModal} />
    </RecipeContext.Provider>
  );
};

export default RecipeForm;
