import { useState } from "react";

export default function TodoModal({
  onClose,
  onSubmit,
  initialValue = ""
}) {
  const [value, setValue] = useState(initialValue);

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center"
      onClick={onClose}  
    >
      <div
        className="bg-white p-5 rounded-lg w-80"
        onClick={(e) => e.stopPropagation()} 
      >
        <h2 className="text-lg font-semibold mb-3">
          {initialValue ? "Edit Todo" : "Add Todo"}
        </h2>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          placeholder="Enter todo..."
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Cancel
          </button>

          <button
            onClick={() => onSubmit(value)}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}