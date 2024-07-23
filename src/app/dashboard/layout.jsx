"use client";
import Navbar from "@/components/NavBar";
import { UserProvider } from "@/contexts/usercontext/UserContext";
import { redirect } from "next/navigation";
import React from "react";

export default function RootLayout({ children }) {
  React.useEffect(() => {
    const userExist = window.localStorage.getItem("user");
    if (!userExist) {
      redirect("/signu");
    }
  });
  return (
    <div className="bg-neutral-100">
      <Navbar />
      {children}
    </div>
  );
}
