import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlusCircle } from "react-icons/fi";

export default function AddWordModal({
  isOpen,
  onClose,
  form,
  onFormChange,
  onExampleChange,
  addExampleField,
  onSubmit,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.form
            className="bg-white bg-opacity-70 backdrop-blur-md rounded-lg p-6 w-full max-w-xl shadow-lg"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onSubmit={onSubmit}
          >
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700 flex items-center gap-2">
              <FiPlusCircle size={26} />
              Add New Word
            </h2>

            <input
              type="text"
              name="word"
              value={form.word}
              onChange={onFormChange}
              placeholder="Word"
              className="w-full p-3 mb-3 rounded-md border border-indigo-400 focus:outline-indigo-600"
              required
            />

            <textarea
              name="meaning"
              value={form.meaning}
              onChange={onFormChange}
              placeholder="Meaning"
              rows={3}
              className="w-full p-3 mb-3 rounded-md border border-indigo-400 focus:outline-indigo-600 resize-none"
              required
            />

            <div className="mb-3">
              <label className="block mb-1 font-semibold text-indigo-700">
                Examples
              </label>
              {form.examples.map((ex, i) => (
                <input
                  key={i}
                  type="text"
                  value={ex}
                  onChange={(e) => onExampleChange(i, e.target.value)}
                  placeholder={`Example ${i + 1}`}
                  className="w-full p-2 mb-2 rounded-md border border-indigo-300 focus:outline-indigo-600"
                />
              ))}
              <button
                type="button"
                onClick={addExampleField}
                className="text-indigo-600 hover:underline text-sm"
              >
                + Add another example
              </button>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md border border-gray-400 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-indigo-700 text-white hover:bg-indigo-800 transition"
              >
                Add Word
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
