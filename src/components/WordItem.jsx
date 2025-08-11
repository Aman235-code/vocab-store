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
      className="bg-white bg-opacity-90 p-5 rounded-lg shadow-md border border-indigo-300"
    >
      <div className="flex justify-between items-start">
        <div>
          <motion.h3
            className="text-2xl text-center font-bold text-indigo-900 mb-2 flex items-center gap-2"
            whileHover={{ scale: 1.1, color: "#4f46e5" }} // Indigo-600
            style={{ cursor: "default" }}
          >
            <FiBookOpen size={26} />
            {word}
          </motion.h3>

          <p className="mb-3 text-indigo-800 italic">{meaning}</p>

          {examples.length > 0 && (
            <ul className="list-disc list-inside space-y-1 text-indigo-700">
              {examples.map((ex, i) => (
                <li key={i}>"{ex}"</li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col items-end space-y-2">
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
