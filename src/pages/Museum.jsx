import React from "react";
import MuseumModelCanvas from "../components/Museum/MuseumModel";

const Museum = () => {
  return (
    <div className="w-screen h-screen bg-gray-900 text-white">
      <h1 className="text-center text-4xl font-bold my-4">Museum Model</h1>
      <div className="w-full h-full">
        <MuseumModelCanvas />
      </div>
    </div>
  );
};

export default Museum;