import React from "react";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-full max-w-xl">
        <motion.div
          className="absolute top-1/2 left-3 transform -translate-y-1/2 text-indigo-600"
          initial={{ scale: 0.8, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <FiSearch size={20} />
        </motion.div>
        <input
          type="text"
          placeholder="Search words..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 p-3 rounded-md border border-indigo-400 focus:outline-indigo-600 bg-white"
        />
      </div>
    </div>
  );
}
