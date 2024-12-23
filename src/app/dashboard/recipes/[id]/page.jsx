"use client";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import Image from "next/image";
import ImageModal from "@/components/ImageModal";

const SkeletonLoader = () => (
  <div className="animate-pulse min-h-screen max-md:px-5 py-20 flex flex-col items-center justify-center">
    <div className="w-full max-w-4xl bg-gray-200 h-64 rounded-2xl mx-auto mb-10"></div>
    <div className="w-full max-w-4xl bg-gray-200 h-16 rounded-2xl mx-auto mb-10"></div>
    <div className="w-full max-w-4xl bg-gray-200 h-48 rounded-2xl mx-auto mb-10"></div>
    <div className="w-full max-w-4xl bg-gray-200 h-48 rounded-2xl mx-auto mb-10"></div>
  </div>
);

const RecipeDetails = ({ params }) => {
  const { id } = params;
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const docRef = doc(db, "recipes", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRecipeDetails(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching recipe details: ", error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (!recipeDetails) {
    return <SkeletonLoader />;
  }

  return (
    <div>
      <div className="min-h-screen max-md:px-5 py-20 flex flex-col items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-2xl flex items-center justify-center max-md:flex-col w-auto max-w-4xl">
          {recipeDetails.image ? (
            <Image
              src={recipeDetails.image}
              alt="Recipe Image"
              className="w-auto h-auto max-h-[500px] rounded-2xl object-contain"
              width={500}
              height={500}
            />
          ) : (
            <p className='p-10'>No image available</p>
          )}
        </div>

        {/* Recipe Title */}
        <div className="text-center mt-10 bg-white rounded-2xl shadow-2xl flex flex-col items-start justify-center max-md:flex-col w-full max-w-4xl">
          <h2 className="text-3xl grid place-items-center w-full font-bold text-green-500 py-10 px-10">
            {recipeDetails.title}
          </h2>
          <p className="text-left px-10 py-10">{recipeDetails.share}</p>
        </div>

        {/* Ingredients Section */}
        <div className="text-center mt-10 bg-white rounded-2xl shadow-2xl flex items-center justify-center max-md:flex-col w-full max-w-4xl">
          <div className="w-full p-10">
            <h2 className="text-3xl font-bold text-green-500 py-10">
              Ingredients
            </h2>
            {recipeDetails.ingredients &&
              recipeDetails.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="text-black border-dashed font-semibold text-lg border-b-2 py-2 w-full text-left"
                >
                  {ingredient}
                </div>
              ))}
          </div>
        </div>

        {/* Cooking Instructions Section */}
        <div className="text-center mt-10 bg-white rounded-2xl shadow-2xl flex items-center justify-center max-md:flex-col w-full max-w-4xl">
          <div className="w-full p-10">
            <h2 className="text-3xl font-bold text-green-500 py-10">
              Cooking Instructions
            </h2>
            <div className="flex flex-col mt-4 text-left">
              {recipeDetails.instructions &&
                recipeDetails.instructions.map((item, index) => (
                  <div
                    key={index}
                    className="w-full rounded flex flex-col items-start"
                  >
                    <div className="w-full grid place-items-center mt-4">
                      <span className="bg-green-500 my-4 text-white text-xl font-semibold w-8 h-8 grid place-content-center items-center justify-center py-1 px-2 rounded-full">
                        {index + 1}
                      </span>
                    </div>
                    <div className="text-left flex flex-col items-start">
                      <p className="text-black font-semibold text-base">
                        {item.instruction}
                      </p>
                      <div className="flex flex-wrap w-full">
                        {item.images &&
                          item.images.map((image, imgIndex) => (
                            <div key={imgIndex} className="w-1/3 p-2">
                              <div
                                className="w-full h-32 flex items-center justify-center relative mb-4 cursor-pointer"
                                onClick={() => openModal(image)}
                              >
                                <Image
                                  src={image}
                                  alt={`Instruction Image ${imgIndex + 1}`}
                                  className="w-full h-full object-cover rounded"
                                  width={200}
                                  height={200}
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        imageSrc={selectedImage}
      />
    </div>
  );
};

export default RecipeDetails;
