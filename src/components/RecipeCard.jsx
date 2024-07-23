'use client'
import Image from 'next/image';
import { useState } from 'react';
// import { FiHeart, FiHeartFill } from 'react-icons/fi';
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";


export default function RecipeCard({ name, image, recipe }) {
  const [isFavorited, setIsFavorited] = useState(false);

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div onClick={() => handleCardClick(recipe.id)} className="flex items-center p-4 bg-white shadow-lg rounded-lg space-x-4">
      <Image src={image} alt={name} className="h-24 w-24 object-cover rounded-lg" width={500} height={500}/>
      <div className="flex flex-col justify-between">
        <h2 className="text-xl font-semibold">{recipe.title}</h2>
        <button onClick={toggleFavorite} className="self-start">
          {isFavorited ? (
            <IoIosHeart className="w-6 h-6 text-red-500" />
          ) : (
            <IoIosHeartEmpty className="w-6 h-6 text-red-500" />
          )}
        </button>
      </div>
    </div>
  );
}
