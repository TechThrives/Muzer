import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 tracking-wide">
          404
        </h1>
        <h2 className="text-xl font-semibold text-gray-700 mt-2 mb-4">
          Page Not Found
        </h2>
        <p className="text-base text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          className="max-w-48 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-md w-full hover:scale-110 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
          onClick={() => navigate("/")}
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
