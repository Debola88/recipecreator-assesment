import { useState } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import Button from "./Button";
import { useContext, useRef } from "react";
import {
  FormProvider,
  RecipeContext,
} from "../contexts/recipecontext/RecipeContext";
import Image from "next/image";

const DynamicInputForm = () => {
  const [sections, setSections] = useState([
    { text: "", images: [{ image: null }] },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState({
    sectionIndex: null,
    imageIndex: null,
  });

  const handleSectionChange = (sectionIndex, key, value) => {
    const newSections = sections.map((section, i) => {
      if (i === sectionIndex) {
        return { ...section, [key]: value };
      }
      return section;
    });
    setSections(newSections);
  };

  const handleImageChange = (sectionIndex, imageIndex, event) => {
    const file = event.target.files[0];
    const newSections = sections.map((section, i) => {
      if (i === sectionIndex) {
        const newImages = section.images.map((img, j) => {
          if (j === imageIndex) {
            return { image: file ? URL.createObjectURL(file) : null };
          }
          return img;
        });
        if (file && section.images.length < 3) {
          newImages.push({ image: null });
        }
        return { ...section, images: newImages };
      }
      return section;
    });
    setSections(newSections);
  };


  const handleModalCancel = () => {
    setShowModal(false);
    setDeleteInfo({ sectionIndex: null, imageIndex: null });
  };

  const { formData, setFormData } = useContext(RecipeContext);

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
                  formData.instructions[index] = {
                    ...formData.instructions[index],
                    instruction: target.value,
                  };
                  setFormData({
                    ...formData,
                  });
                }}
                className="w-full rounded md:text-lg bg-gray-100 p-2 outline-none h-32 flex-1"
                placeholder={`Step ${index + 1}`}
                required
              ></textarea>
              <button
                onClick={() => {
                  setFormData({
                    ...formData,
                    instructions: formData.instructions.filter(
                      (ing, i) => i !== index
                    ),
                  });
                }}
                className="bg-red-500 text-white p-3 ml-2 rounded"
              >
                <RiDeleteBinFill />
              </button>
            </div>
            <div className="flex flex-wrap w-full">
              {images.map((image, imageIndex) => (
                <>
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
                          (formData.instructions[index].images = images.filter(
                            (img, i) => i !== imageIndex
                          )),
                            setFormData({
                              ...formData,
                            });
                          // setShowModal(true);
                        }}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                      >
                        <RiDeleteBinFill />
                      </button>
                    </div>
                  </div>
                  {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                      <div className="bg-white p-6 rounded shadow-md">
                        <h2 className="text-xl font-bold mb-4">
                          Confirm Image Delete
                        </h2>
                        <p>
                          Are you sure you want to delete this image? {index}
                        </p>
                        <div className="mt-4 flex justify-end">
                          <button
                            onClick={handleModalCancel}
                            className="bg-gray-300 text-black p-2 rounded mr-2"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              (formData.instructions[index].images =
                                images.filter((img, i) => i !== imageIndex)),
                                setFormData({
                                  ...formData,
                                });
                              setShowModal(false);
                            }}
                            className="bg-red-500 text-white p-2 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}
              {images.length < 3 && (
                <label className="h-full flex flex-col items-center justify-center cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H4zm1 10a1 1 0 100 2h10a1 1 0 100-2H5zm3-4a1 1 0 100 2h4a1 1 0 100-2H8zm0-4a1 1 0 100 2h4a1 1 0 100-2H8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-400 mt-2 text-sm">
                    Select Image
                  </span>
                  <input
                    type="file"
                    onChange={({ target }) => {
                      const imgUrl = URL.createObjectURL(target.files[0]);
                      formData.instructions[index] = {
                        ...formData.instructions[index],
                        images: [...images, imgUrl],
                      };
                      setFormData({
                        ...formData,
                      });
                    }}
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

      {/* Modal */}
    </div>
  );
};

export default DynamicInputForm;
