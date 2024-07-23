"use client"
import { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { FaHome, FaUtensils, FaHeart, FaUserAlt } from 'react-icons/fa';
import Link from 'next/link';
import { FaPlus } from "react-icons/fa6";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-green-500 text-white shadow sticky">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <div className="text-2xl font-bold">MyRecipeApp</div>
            </Link>
          </div>
          <div className="hidden md:flex md:space-x-4">
            <Link href="/dashboard/recipes">
              <div className="px-3 py-2 rounded-md text-sm font-semibold hover:bg-green-300 flex items-center">
                <FaUtensils className="mr-2" /> Recipes
              </div>
            </Link>
            {/* <Link href="/dashboard/recipes">
              <div className="px-3 py-2 rounded-md text-sm font-semibold hover:bg-green-300 flex items-center">
                <FaUtensils className="mr-2" /> Recipes
              </div>
            </Link> */}
            <Link href="/favorites">
              <div className="px-3 py-2 rounded-md text-sm font-semibold hover:bg-green-300 flex items-center">
                <FaHeart className="mr-2" /> Favorites
              </div>
            </Link>
            <Link href="/profile">
              <div className="px-3 py-2 rounded-md text-sm font-semibold hover:bg-green-300 flex items-center">
                <FaUserAlt className="mr-2" /> Profile
              </div>
            </Link>
            <Link href="/dashboard/recipeform">
              <div className="px-3 py-2 rounded-md text-sm font-semibold hover:bg-green-300 flex items-center">
                <FaPlus className="mr-2" /> Create
              </div>
            </Link>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 text-white cursor-pointer"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <MdOutlineRestaurantMenu className=" h-6 w-6" aria-hidden="true" /> : <IoMenu className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div className="md:hidden" id="mobile-menu">
            <div ref={ref} className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
              <Link href="/dashboard/recipes">
                <div className=" px-3 py-2 rounded-md text-base font-medium hover:bg-green-300 flex items-center">
                  <FaUtensils className="mr-1" /> Recipes
                </div>
              </Link>
              <Link href="/recipes">
                <div className=" px-3 py-2 rounded-md text-base font-medium hover:bg-green-300 flex items-center">
                  <FaHeart className="mr-1" /> Favorites
                </div>
              </Link>
              <Link href="/profile">
                <div className=" px-3 py-2 rounded-md text-base font-medium hover:bg-green-300 flex items-center">
                  <FaUserAlt className="mr-1" /> Profile
                </div>
              </Link>
              <Link href="/dashboard/recipeform">
                <div className=" px-3 py-2 rounded-md text-base font-medium hover:bg-green-700 flex items-center">
                  <FaPlus className="mr-1" /> Create
                </div>
              </Link>
            </div>
          </div>
        )}
      </Transition>
    </nav>
  );
};

export default Navbar;
