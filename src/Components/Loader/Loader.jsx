import React from 'react';

const Loader = ({ message = "Analizando imagen..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="w-20 h-20 border-4 border-transparent text-blue-600 text-4xl animate-spin flex items-center justify-center border-t-blue-600 rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-red-500 text-2xl animate-spin flex items-center justify-center border-t-red-500 rounded-full">
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mt-4">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;