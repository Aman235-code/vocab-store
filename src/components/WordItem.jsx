import React from "react";
import { motion } from "framer-motion";
import { FiEdit2, FiTrash2, FiBookOpen } from "react-icons/fi";

export default function WordItem({ wordObj, onDelete, onEdit }) {
  const { id, word, meaning, examples } = wordObj;

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-white bg-opacity-25 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-indigo-200 max-w-xl mx-auto"
      style={{
        boxShadow:
          "0 8px 32px 0 rgba(99, 102, 241, 0.25), 0 4px 16px 0 rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="flex flex-col items-center">
        <motion.h3
          className="text-3xl font-extrabold text-indigo-900 mb-4 flex items-center gap-3 justify-center"
          whileHover={{ scale: 1.1, color: "#6366f1" }} // Indigo-500
          style={{ cursor: "default" }}
        >
          <FiBookOpen size={28} />
          {word}
        </motion.h3>

        <p className="mb-5 text-indigo-800 italic text-center max-w-lg">
          {meaning}
        </p>

        {examples.length > 0 && (
          <ul className="list-disc list-inside space-y-1 text-indigo-700 max-w-lg">
            {examples.map((ex, i) => (
              <li key={i} className="text-center">
                "{ex}"
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-6 mt-6">
          <motion.button
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(id)}
            aria-label={`Edit word ${word}`}
            className="text-indigo-700 hover:text-indigo-900 font-semibold flex items-center gap-1"
            type="button"
          >
            <FiEdit2 size={20} />
            Edit
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.2, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(id)}
            aria-label={`Delete word ${word}`}
            className="text-red-600 hover:text-red-800 font-semibold flex items-center gap-1"
            type="button"
          >
            <FiTrash2 size={20} />
            Delete
          </motion.button>
        </div>
      </div>
    </motion.li>
  );
}
