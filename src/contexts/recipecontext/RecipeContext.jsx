
import { createContext, useState } from 'react';

export const RecipeContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    title: '',
    share: '',
    ingredient: '',

  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission, e.g., send data to an API or Firebase
  };

  return (
    <RecipeContext.Provider value={{ formData, setFormData, handleChange, handleSubmit }}>
      {children}
    </RecipeContext.Provider>
  );
};
