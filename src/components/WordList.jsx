import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import WordItem from "./WordItem";

export default function WordList({ words, onDelete, onEdit }) {
  if (words.length === 0)
    return <p className="text-white text-center">No words found.</p>;

  return (
    <ul className="space-y-6 w-full max-w-3xl">
      <h2 className="text-3xl font-bold mb-6 text-white drop-shadow-md">
        Words List
      </h2>
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
