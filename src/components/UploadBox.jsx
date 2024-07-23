import { useState, useContext } from "react";
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";
import { RecipeContext } from "../contexts/recipecontext/RecipeContext";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image";

export default function UploadBox() {
  const [image, setImage] = useState(null);
  const { formData, setFormData } = useContext(RecipeContext);
  const storage = getStorage();

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      const imageUrl = URL.createObjectURL(imageFile);
      setImage(imageUrl);

      // Upload the image to Firebase Storage
      const storageRef = ref(storage, `images/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(storageRef);

      // Update form data with the image URL
      setFormData({ ...formData, image: downloadURL });
    }
  };

  const removeImage = () => {
    setImage(null);
    setFormData({ ...formData, image: null });
  };

  return (
    <div className="flex flex-col items-center justify-center mb-10 w-full min-h-[300px] lg:h-96 max-w-4xl bg-gradient-to-r from-green-500 to-blue-500/70 rounded-lg shadow-lg">
      {image ? (
        <div className="relative h-full w-full">
          <Image
            src={image}
            alt="Uploaded"
            className="h-full w-full object-cover rounded-lg"
            width={200}
            height={200}
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:bg-red-300"
          >
            <FiTrash2 className="w-6 h-6" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center h-full w-full cursor-pointer text-white">
          <FiUploadCloud className="w-16 h-16" />
          <p className="mt-2 text-lg">Upload your recipe photo</p>
          <p className="mt-1 text-sm">Show others your finished dish</p>
          <input
            type="file"
            className="hidden"
            name="uploadbox"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
      )}
    </div>
  );
}
