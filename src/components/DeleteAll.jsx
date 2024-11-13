// DeleteAllButton.jsx
import React, { useState } from "react";
import { IoTrashBin } from "react-icons/io5";

function DeleteAllButton({ onDeleteAll }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const confirmDeleteAll = () => {
    onDeleteAll();
    closeModal();
  };

  return (
    <>
      {/* Trash Button to open Modal */}
      <div
        onClick={openModal}
        className="flex justify-center py-1 bg-gradient-to-b from-red-400 to-red-600 md:hover:to-red-500 mx-3 rounded-sm cursor-pointer"
      >
        <IoTrashBin className="text-2xl text-white" />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[300px] text-center relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500"
            >
              ✕
            </button>
            <p className="text-lg font-semibold mb-4">Are you sure?</p>
            <div className="flex justify-around">
              <button
                onClick={confirmDeleteAll}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Yes
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 py-2 px-4 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteAllButton;
