import React from "react";

export default function ConfirmModal({
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item?",
  onConfirm,
  onCancel,
  loading = false,
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50" onClick={onCancel}>
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg" onClick={(e)=>e.stopPropagation()}>

        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {title}
        </h2>

        <p className="text-sm text-gray-600 mb-5">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 bg-gray-200 rounded hover:bg-gray-300"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-3 py-1.5 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}