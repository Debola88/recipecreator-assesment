'use client';
import { FavoritesContext } from "@/contexts/favouritescontext/FavouritesContext";
import Image from "next/image";
import { useState, useContext } from "react";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";

export default function RecipeCard({ recipe, onViewDetails }) {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const isFavorited = favorites.some(fav => fav.id === recipe.id);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorited) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
      {recipe.image && (
        <div className="relative h-48 w-full">
          <Image
            src={recipe.image}
            alt={recipe.title}
            className="object-cover"
            layout="fill"
          />
        </div>
      )}
      <div className="flex flex-col p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{recipe.title}</h2>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {recipe.share}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <button onClick={toggleFavorite} className="self-start">
            {isFavorited ? (
              <IoIosHeart className="w-6 h-6 text-red-500" />
            ) : (
              <IoIosHeartEmpty className="w-6 h-6 text-red-500" />
            )}
          </button>
          <button
            onClick={onViewDetails}
            className="py-2 px-4 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-all duration-300"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
