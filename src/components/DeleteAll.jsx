import React, { useState } from "react";

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
      <div
        onClick={openModal}
        className="flex justify-center py-1 bg-gradient-to-b from-red-400 to-red-600 md:hover:to-red-500 mx-3 rounded-sm cursor-pointer"
      >
        <p className="font-poppinsBold text-sm md:text-base text-white">
          Delete All
        </p>
      </div>

      {showModal && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-5 w-[280px] text-center relative">
            <button
              onClick={closeModal}
              className="absolute top-1 right-2 text-gray-500"
            >
              ✕
            </button>
            <p className="font-poppinsBold mb-7">Are you sure?</p>
            <div className="flex justify-around">
              <button
                onClick={confirmDeleteAll}
                className="bg-red-500 text-white py-2 px-4 rounded font-poppinsRegular"
              >
                Yes
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 py-2 px-4 rounded font-poppinsRegular"
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
