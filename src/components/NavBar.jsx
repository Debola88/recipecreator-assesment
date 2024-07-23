'use client';
import { useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { IoLogOut, IoMenu } from "react-icons/io5";
import { FaUtensils, FaHeart, FaUserAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";
import { firebase } from "@/app/config/firebase";
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/usercontext/UserContext'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [routerReady, setRouterReady] = useState(false);
  const router = useRouter();
  const { user, setUser } = useUser();

  useEffect(() => {
    setRouterReady(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    const auth = getAuth(firebase);
    await signOut(auth);
    window.localStorage.removeItem('user');
    setUser(null);
    if (routerReady) {
      router.push('/');
    }
  };

  return (
    <nav className="bg-green-500 text-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <div className="text-2xl font-bold cursor-pointer">MyRecipeApp</div>
            </Link>
          </div>
          <div className="hidden md:flex md:space-x-4">
            <Link href="/dashboard/recipes">
              <div className="px-3 py-2 rounded-md text-sm font-semibold hover:bg-green-300 flex items-center transition-colors duration-200 cursor-pointer">
                <FaUtensils className="mr-2" /> Recipes
              </div>
            </Link>
            <Link href="/dashboard/favourites">
              <div className="px-3 py-2 rounded-md text-sm font-semibold hover:bg-green-300 flex items-center transition-colors duration-200 cursor-pointer">
                <FaHeart className="mr-2" /> Favorites
              </div>
            </Link>
            <Link href="/dashboard/recipeform">
              <div className="px-3 py-2 rounded-md text-sm font-semibold hover:bg-green-300 flex items-center transition-colors duration-200 cursor-pointer">
                <FaPlus className="mr-2" /> Create
              </div>
            </Link>
            {user && (
              <div onClick={handleLogout} className="px-3 py-2 rounded-md text-sm font-semibold hover:bg-green-300 flex items-center transition-colors duration-200 cursor-pointer">
                <IoLogOut className="mr-2" /> Logout
              </div>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 text-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <MdOutlineRestaurantMenu className="h-6 w-6" aria-hidden="true" />
              ) : (
                <IoMenu className="block h-6 w-6" aria-hidden="true" />
              )}
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
          <div className="md:hidden bg-green-500 text-white" id="mobile-menu">
            <div ref={ref} className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
              <Link href="/dashboard/recipes">
                <div onClick={toggleMenu} className="px-3 py-2 rounded-md text-base font-medium hover:bg-green-300 flex items-center transition-colors duration-200 cursor-pointer">
                  <FaUtensils className="mr-2" /> Recipes
                </div>
              </Link>
              <Link href="/dashboard/favourites">
                <div onClick={toggleMenu} className="px-3 py-2 rounded-md text-base font-medium hover:bg-green-300 flex items-center transition-colors duration-200 cursor-pointer">
                  <FaHeart className="mr-2" /> Favorites
                </div>
              </Link>
              <Link href="/dashboard/recipeform">
                <div onClick={toggleMenu} className="px-3 py-2 rounded-md text-base font-medium hover:bg-green-300 flex items-center transition-colors duration-200 cursor-pointer">
                  <FaPlus className="mr-2" /> Create
                </div>
              </Link>
              {user && (
                <div onClick={() => { handleLogout(); toggleMenu(); }} className="px-3 py-2 rounded-md text-base font-medium hover:bg-green-300 flex items-center transition-colors duration-200 cursor-pointer">
                  <IoLogOut className="mr-2" /> Logout
                </div>
              )}
            </div>
          </div>
        )}
      </Transition>
    </nav>
  );
};

export default Navbar;
