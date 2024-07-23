import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 pr-12 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-green-500 shadow-sm"
          placeholder="Search by category or ingredient..."
        />
        <button
          onClick={handleSearch}
          className="absolute inset-y-0 right-0 flex items-center px-4 bg-green-500 text-white text-sm font-semibold rounded-r-lg hover:bg-green-600 transition-all duration-300"
        >
          <FaSearch className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
