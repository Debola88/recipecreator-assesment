"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import RecipeCard from "@/components/RecipeCard";
import SearchBar from "@/components/SearchBar";
import { IoIosAddCircleOutline } from "react-icons/io";
import Button from "@/components/Button";
import { useRouter } from 'next/router';


const RecipeList = () => {
  const [recipesByCategory, setRecipesByCategory] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesQuery = query(collection(db, "recipes"));
        const querySnapshot = await getDocs(recipesQuery);
        const recipesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const groupedRecipes = recipesData.reduce((acc, recipe) => {
          const { category } = recipe;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(recipe);
          return acc;
        }, {});

        setRecipesByCategory(groupedRecipes);
        setFilteredRecipes(groupedRecipes);
      } catch (error) {
        console.error("Error fetching recipes: ", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredRecipes(recipesByCategory);
      return;
    }

    const filtered = Object.keys(recipesByCategory).reduce((acc, category) => {
      const filteredCategory = recipesByCategory[category].filter(
        (recipe) =>
          (recipe.category &&
            recipe.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (recipe.ingredients &&
            recipe.ingredients.some((ingredient) =>
              ingredient.toLowerCase().includes(searchTerm.toLowerCase())
            ))
      );

      if (filteredCategory.length > 0) {
        acc[category] = filteredCategory;
      }

      return acc;
    }, {});

    setFilteredRecipes(filtered);
  };

  return (
    <div className="recipe-list p-6">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      {Object.keys(filteredRecipes).length > 0 ? (
        Object.keys(filteredRecipes).map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-green-500 mb-4 uppercase">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredRecipes[category].map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onViewDetails={() =>
                    (window.location.href = `/dashboard/recipes/${recipe.id}`)
                  }
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-start w-full min-h-screen h-full">
          <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-10 max-w-md">
            <IoIosAddCircleOutline className="w-24 h-24 text-green-500 mb-6 animate-bounce" />
            <p className="text-lg font-semibold text-gray-800 mb-4">
              No recipes found
            </p>
            <p className="text-sm text-gray-600 text-center mb-6">
              It looks like you haven`t created any recipes yet. Start by adding
              your favorite dish!
            </p>
            <button
              onClick={() => router.push("/dashboard/recipeform/")}
              className="py-2 px-6 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-all duration-300"
            >
              Create Recipe
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeList;
