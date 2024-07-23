"use client";
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa6";
import Link from "next/link";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebase } from "@/app/config/firebase";

export default function Signup() {
  const [signupData, setsignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setsignupData({
      ...signupData,
      [name]: files ? files[0] : value,
    });
  };

  useEffect(() => {
    console.log("Form Data", signupData);
  }, [signupData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth(firebase);
    createUserWithEmailAndPassword(auth, signupData.email, signupData.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("New User", user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("User Error", error);
      });
  };

  return (
    <main className="flex py-10 min-h-screen bg-neutral-100 flex-col items-center justify-between md:p-20 px-5">
      <div className="bg-white rounded-2xl shadow-2xl flex max-md:flex-col md:w-2/3 w-full max-w-4xl md:max-h-4xl">
        {/* sign up section */}
        <div className="md:w-3/5 text-center p-10 md:py-12 md:px-20 max-w-full">
          <h2 className="text-green-500 text-3xl font-bold mb-2">
            Create an Account
          </h2>
          <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
          <p className="mb-2 text-sm mt-10 text-gray-400">
            Fill up the information to create a new account and explore.
          </p>
          {/* Sign up form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center mt-8"
          >
            <div className="bg-gray-100 w-full rounded flex items-center px-2">
              <FaUser className="text-gray-400" />
              <input
                type="text"
                className="w-full rounded md:text-sm bg-gray-100 p-2 outline-none h-10 flex-1"
                placeholder="Username"
                name="username"
                value={signupData.username}
                onChange={handleChange}
              />
            </div>
            <div className="bg-gray-100 w-full rounded flex mt-4 items-center px-2">
              <FaEnvelope className="text-gray-400" />
              <input
                type="email"
                className="w-full rounded md:text-sm bg-gray-100 p-2 outline-none h-10 flex-1"
                placeholder="Email"
                name="email"
                value={signupData.email}
                onChange={handleChange}
              />
            </div>
            <div className="bg-gray-100 w-full rounded flex mt-4 mb-4 items-center px-2">
              <FaLock className="text-gray-400" />
              <input
                type="password"
                className="w-full rounded md:text-sm bg-gray-100 p-2 outline-none h-10 flex-1"
                placeholder="Password"
                name="password"
                value={signupData.password}
                onChange={handleChange}
              />
            </div>
            <Button type="submit">Create Account</Button>
          </form>
        </div>
        {/* sign in section */}
        <div className="md:w-2/5 py-10 px-10 max-w-full text-center bg-green-500 max-md:rounded-b-2xl md:rounded-r-2xl text-white md:py-36 md:px-12">
          <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
          <div className="border-2 w-10 border-white inline-block mb-2"></div>
          <p className="mb-2 text-sm">
            Already have an account? Sign in to continue your journey.
          </p>
          <div className="inline-block mt-2">
            <Link href="/">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
