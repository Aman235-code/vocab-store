import React from "react";
import wordsData from "./data/words.json";
import SearchBar from "./components/SearchBar";
import WordList from "./components/WordList";
import EditModal from "./components/EditModal";
import AddWordModal from "./components/AddWordModal";
import Pagination from "./components/Pagination";
import { FiPlus } from "react-icons/fi";
import { FiBookOpen } from "react-icons/fi";
import { motion } from "framer-motion";

export default function App() {
  const WORDS_PER_PAGE = 5;

  const [words, setWords] = React.useState(() => {
    const saved = localStorage.getItem("vocabWords");
    return saved ? JSON.parse(saved) : wordsData;
  });

  React.useEffect(() => {
    localStorage.setItem("vocabWords", JSON.stringify(words));
  }, [words]);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [editingWordId, setEditingWordId] = React.useState(null);

  const [addModalOpen, setAddModalOpen] = React.useState(false);

  // Add form state for modal
  const [addForm, setAddForm] = React.useState({
    word: "",
    meaning: "",
    examples: [""],
  });

  // Edit form state
  const [editForm, setEditForm] = React.useState({
    word: "",
    meaning: "",
    examples: [""],
  });

  // Filter words by search
  const filteredWords = words.filter(({ word }) =>
    word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredWords.length / WORDS_PER_PAGE);
  const paginatedWords = filteredWords.slice(
    (currentPage - 1) * WORDS_PER_PAGE,
    currentPage * WORDS_PER_PAGE
  );

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, words]);

  // Add form handlers
  function handleAddFormChange(e) {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  }
  function handleAddExampleChange(index, value) {
    const newExamples = [...addForm.examples];
    newExamples[index] = value;
    setAddForm({ ...addForm, examples: newExamples });
  }
  function addAddExampleField() {
    setAddForm({ ...addForm, examples: [...addForm.examples, ""] });
  }
  function handleAddSubmit(e) {
    e.preventDefault();
    if (!addForm.word.trim() || !addForm.meaning.trim()) {
      alert("Word and meaning are required.");
      return;
    }
    const newWord = {
      id: Date.now(),
      word: addForm.word.trim(),
      meaning: addForm.meaning.trim(),
      examples: addForm.examples.filter((ex) => ex.trim() !== ""),
    };
    setWords([newWord, ...words]);
    setAddForm({ word: "", meaning: "", examples: [""] });
    setAddModalOpen(false);
  }

  // Delete handler
  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this word?")) {
      setWords(words.filter((w) => w.id !== id));
    }
  }

  // Edit modal open
  function openEditModal(id) {
    const w = words.find((w) => w.id === id);
    if (!w) return;
    setEditingWordId(id);
    setEditForm({
      word: w.word,
      meaning: w.meaning,
      examples: [...w.examples],
    });
  }

  // Edit form handlers
  function handleEditFormChange(e) {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  }
  function handleEditExampleChange(index, value) {
    const newExamples = [...editForm.examples];
    newExamples[index] = value;
    setEditForm({ ...editForm, examples: newExamples });
  }
  function addEditExampleField() {
    setEditForm({ ...editForm, examples: [...editForm.examples, ""] });
  }

  function handleEditSave() {
    if (!editForm.word.trim() || !editForm.meaning.trim()) {
      alert("Word and meaning cannot be empty.");
      return;
    }
    const updatedWord = {
      id: editingWordId,
      word: editForm.word.trim(),
      meaning: editForm.meaning.trim(),
      examples: editForm.examples.filter((ex) => ex.trim() !== ""),
    };
    setWords(words.map((w) => (w.id === editingWordId ? updatedWord : w)));
    setEditingWordId(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-pink-300 to-indigo-400 p-6 flex flex-col items-center">
      <motion.h1
        className="flex items-center justify-center gap-3
                 text-4xl font-extrabold mb-6
                 text-black drop-shadow-lg
                 bg-white bg-opacity-20 backdrop-blur-md
                 rounded-xl px-6 py-4 shadow-lg
                 cursor-default select-none
                 hover:bg-opacity-40 transition duration-300"
        whileHover={{ scale: 1.05, rotate: 2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <FiBookOpen size={40} className="text-indigo-300" />
        Vocab Store
      </motion.h1>

      {/* Glassmorphic container */}
      <div className="w-full max-w-4xl bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-6 shadow-lg">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="flex justify-center">
          <motion.button
            onClick={() => setAddModalOpen(true)}
            type="button"
            aria-label="Add New Word"
            className="mb-6 mt-6 flex items-center gap-2 px-6 py-3
               bg-yellow-300 bg-opacity-20 backdrop-blur-md
               text-red-500 font-semibold rounded-full shadow-lg
               cursor-pointer
               hover:bg-opacity-40 hover:shadow-xl
               transition duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(99, 102, 241, 0.7)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlus size={24} />
            Add Word
          </motion.button>
        </div>

        <WordList
          words={paginatedWords}
          onDelete={handleDelete}
          onEdit={openEditModal}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <AddWordModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        form={addForm}
        onFormChange={handleAddFormChange}
        onExampleChange={handleAddExampleChange}
        addExampleField={addAddExampleField}
        onSubmit={handleAddSubmit}
      />

      <EditModal
        isOpen={editingWordId !== null}
        onClose={() => setEditingWordId(null)}
        form={editForm}
        onFormChange={handleEditFormChange}
        onExampleChange={handleEditExampleChange}
        addExampleField={addEditExampleField}
        onSave={handleEditSave}
      />
    </div>
  );
}
