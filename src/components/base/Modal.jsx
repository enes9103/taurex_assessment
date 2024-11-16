import React from "react";
import { MdDone } from "react-icons/md";

const Modal = ({ isOpen, onClose, uniqArray }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        {/* Improved icon container */}
        <div className="mx-auto flex justify-center items-center bg-green-400 p-4 rounded-full w-16 h-16">
          <MdDone className="text-white text-3xl" />
        </div>

        <h2 className="text-xl font-semibold text-center mt-4">
          Submit Successful
        </h2>
        <p className="text-center mt-4">
          Your submission has been successfully processed!
        </p>

        {/* Display the uniqArray */}
        <div className="mt-6">
          <h3 className="font-medium">Selected Unique IDs:</h3>
          <div className="ml-6 mt-2">
            {uniqArray.map((id) => (
              <span key={id} className="text-sm text-gray-700">
                {`${id}, `}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
