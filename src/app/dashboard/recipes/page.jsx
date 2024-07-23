// import React, { useState, useEffect } from "react";
// import food from "@/app/assets/pexels-xmtnguyen-699953.jpg";
// import Image from "next/image";
// import StepSection from "@/components/StepSection";
// import { collection, query, where, getDocs } from "firebase/firestore";

// const RecipeDetails = ({ recipeId }) => {
//   const [recipeDetails, setRecipeDetails] = useState(null);

//   useEffect(() => {
//     const fetchRecipeDetails = async () => {
//       const docRef = doc(db, "recipes", recipeId);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         setRecipeDetails(docSnap.data());
//       } else {
//         console.log("No such document!");
//       }
//     };

//     if (recipeId) {
//       fetchRecipeDetails();
//     }
//   }, [recipeId]);

//   if (!recipeDetails) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen max-md:px-5 py-20 flex flex-col items-center justify-center">
//       <div className="text-center bg-white rounded-2xl shadow-2xl flex items-center justify-center max-md:flex-col w-auto max-w-4xl">
//         <Image
//           src={food}
//           alt=""
//           className="w-auto h-auto max-h-[500px] rounded-2xl object-contain"
//           width={500}
//           height={500}
//         />
//       </div>
//       <div className="text-center mt-10 bg-white rounded-2xl shadow-2xl flex items-center justify-center max-md:flex-col w-full max-w-4xl">
//         <h2 className="text-3xl font-bold text-green-500 py-10">{recipeDetails.title}</h2>
//       </div>
//       <div className="text-center mt-10 bg-white rounded-2xl shadow-2xl flex items-center justify-center max-md:flex-col w-full max-w-4xl">
//         <div className=" w-full p-10">
//           <h2 className="text-3xl font-bold text-green-500 py-10">
//             Ingredients
//           </h2>
//           <div className="text-black border-dashed font-semibold text-lg border-b-2 py-2 w-full text-left">
//           {recipeDetails.ingredients}
//           </div>
//         </div>
//       </div>
//       <div className="text-center mt-10 bg-white rounded-2xl shadow-2xl flex items-center justify-center max-md:flex-col w-full max-w-4xl">
//         <div className=" w-full p-10">
//           <h2 className="text-3xl font-bold text-green-500 py-10">
//             Cooking Instruction
//           </h2>
//           <StepSection />
//         </div>
//       </div>
//     </div>
//   );
// };

'use client';
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import Link from "next/link";
import { useUser } from "@/contexts/usercontext/UserContext";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const { user } = useUser(); // Get the current user

  useEffect(() => {
    const fetchRecipes = async () => {
      // if (user) 
        // {
      // , where("userId", "==", user.uid)
        const recipesQuery = query(collection(db, "recipes"));
        const querySnapshot = await getDocs(recipesQuery);
        const recipesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecipes(recipesData);
      // }
    };

    fetchRecipes();
  }, [user]);

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <Link key={recipe.id} href={`/dashboard/recipes/${recipe.id}`}>
          <div className="recipe-card">
            <h3>{recipe.title}</h3>
            <p>{recipe.share}</p>
            <p>User ID: {recipe.id}</p> {/* Display user ID */}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecipeList;

