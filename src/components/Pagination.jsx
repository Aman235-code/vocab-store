import React from "react";
import { motion } from "framer-motion";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const buttonClasses = `
    px-6 py-2 rounded-full border
    border-indigo-600 bg-indigo-100 text-indigo-700
    disabled:opacity-50 disabled:cursor-not-allowed
    font-semibold shadow-md
  `;

  return (
    <div className="flex justify-center mt-6 space-x-6">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={
          buttonClasses +
          " hover:bg-indigo-300 hover:text-indigo-900 transition-colors duration-200"
        }
        aria-label="Previous Page"
        type="button"
      >
        Prev
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={
          buttonClasses +
          " hover:bg-indigo-300 hover:text-indigo-900 transition-colors duration-200"
        }
        aria-label="Next Page"
        type="button"
      >
        Next
      </motion.button>
    </div>
  );
}
