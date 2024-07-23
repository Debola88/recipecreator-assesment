import { useState, useContext } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import Button from "./Button";
import { RecipeContext } from "../contexts/recipecontext/RecipeContext";
import Image from "next/image";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/config/firebase";
import { FaImages } from "react-icons/fa6";

const DynamicInputForm = () => {
  const { formData, setFormData } = useContext(RecipeContext);

  const handleImageUpload = async (file, sectionIndex) => {
    if (!file) return;

    const storageRef = ref(storage, `recipes/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    const updatedInstructions = [...formData.instructions];
    updatedInstructions[sectionIndex].images.push(downloadURL);

    setFormData({
      ...formData,
      instructions: updatedInstructions,
    });
  };

  const handleImageChange = (sectionIndex, event) => {
    const file = event.target.files[0];
    handleImageUpload(file, sectionIndex);
  };

  return (
    <div>
      <div className="flex flex-col mt-4">
        {formData.instructions.map(({ instruction, images }, index) => (
          <div
            key={index}
            className="w-full rounded flex flex-col items-center"
          >
            <span className="bg-green-500 my-4 text-white text-xl font-semibold w-8 h-8 flex items-center justify-center py-1 px-2 rounded-full">
              {index + 1}
            </span>
            <div className="w-full flex items-start mb-4">
              <textarea
                type="text"
                value={instruction}
                name="ingredient"
                onChange={({ target }) => {
                  const updatedInstructions = [...formData.instructions];
                  updatedInstructions[index].instruction = target.value;
                  setFormData({
                    ...formData,
                    instructions: updatedInstructions,
                  });
                }}
                className="w-full rounded md:text-lg bg-gray-100 p-2 outline-none h-32 flex-1"
                placeholder={`Step ${index + 1}`}
                required
              ></textarea>
              <button
                onClick={() => {
                  const updatedInstructions = formData.instructions.filter(
                    (ing, i) => i !== index
                  );
                  setFormData({
                    ...formData,
                    instructions: updatedInstructions,
                  });
                }}
                className="bg-red-500 text-white p-3 ml-2 rounded"
              >
                <RiDeleteBinFill />
              </button>
            </div>
            <div className="flex flex-wrap w-full">
              {images.map((image, imageIndex) => (
                <div key={imageIndex} className="w-1/3 p-2">
                  <div className="w-full h-32 flex items-center justify-center relative mb-4">
                    <Image
                      src={image}
                      alt={`Preview ${imageIndex + 1}`}
                      className="w-full h-full object-cover rounded"
                      style={{ aspectRatio: "1 / 1" }}
                      width={200}
                      height={200}
                    />
                    <button
                      onClick={() => {
                        const updatedImages = images.filter(
                          (img, i) => i !== imageIndex
                        );
                        const updatedInstructions = [...formData.instructions];
                        updatedInstructions[index].images = updatedImages;
                        setFormData({
                          ...formData,
                          instructions: updatedInstructions,
                        });
                      }}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                    >
                      <RiDeleteBinFill />
                    </button>
                  </div>
                </div>
              ))}
              {images.length < 3 && (
                <label className="flex flex-col h-32 mb-4 items-center justify-center cursor-pointer">
                  <FaImages className="h-6 w-6 text-gray-400" />
                  <span className="text-gray-400 mt-2 text-sm">
                    Select Image
                  </span>
                  <input
                    type="file"
                    onChange={(e) => handleImageChange(index, e)}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              )}
            </div>
          </div>
        ))}
      </div>
      <div
        onClick={() =>
          setFormData({
            ...formData,
            instructions: [
              ...formData.instructions,
              { instruction: "", images: [] },
            ],
          })
        }
      >
        <Button>Add more step</Button>
      </div>
    </div>
  );
};

export default DynamicInputForm;
