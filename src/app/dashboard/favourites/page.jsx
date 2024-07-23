'use client';
import React, { useContext } from 'react';
import RecipeCard from '@/components/RecipeCard';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FavoritesContext } from '@/contexts/favouritescontext/FavouritesContext';

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="p-6 min-h-screen w-full">
      <h2 className="text-2xl font-bold text-center text-green-500 mb-6">Favorite Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {favorites.length > 0 ? (
          favorites.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onViewDetails={() => (window.location.href = `/dashboard/recipes/${recipe.id}`)}
            />
          ))
        ) : (
          <div className="flex flex-col md:absolute items-center justify-start w-full min-h-screen">
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-10 max-w-md">
              <IoIosAddCircleOutline className="w-24 h-24 text-green-500 mb-6 animate-bounce" />
              <p className="text-lg font-semibold text-gray-800 mb-4">No favorite recipes</p>
              <p className="text-sm text-gray-600 text-center mb-6">You haven`t added any recipes to your favorites yet.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
