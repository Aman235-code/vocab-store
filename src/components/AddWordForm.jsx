import React from "react";

export default function AddWordForm({
  form,
  onChange,
  onExampleChange,
  addExampleField,
  onSubmit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-full max-w-xl mb-10"
    >
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
        Add New Word
      </h2>

      <input
        type="text"
        name="word"
        value={form.word}
        onChange={onChange}
        placeholder="Word"
        className="w-full p-3 mb-3 rounded-md border border-indigo-400 focus:outline-indigo-600"
        required
      />

      <textarea
        name="meaning"
        value={form.meaning}
        onChange={onChange}
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

      <button
        type="submit"
        className="w-full bg-indigo-700 text-white font-semibold py-3 rounded-md hover:bg-indigo-800 transition"
      >
        Add Word
      </button>
    </form>
  );
}
