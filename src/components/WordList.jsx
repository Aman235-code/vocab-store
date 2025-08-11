import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import WordItem from "./WordItem";
import { FiBookOpen } from "react-icons/fi";

export default function WordList({ words, onDelete, onEdit }) {
  if (words.length === 0)
    return <p className="text-white text-center">No words found.</p>;

  return (
    <ul className="space-y-6 w-full">
      <div className="flex justify-center w-full mb-6">
        <motion.h2
          className="flex items-center gap-3 text-3xl font-bold
               text-black drop-shadow-md
               bg-white bg-opacity-20 backdrop-blur-md rounded-lg
               px-4 py-2 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.05, textShadow: "0 0 10px #ffffff" }}
        >
          <FiBookOpen size={32} />
          Words List
        </motion.h2>
      </div>

      <AnimatePresence>
        {words.map((w) => (
          <WordItem
            key={w.id}
            wordObj={w}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
}
