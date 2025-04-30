import React from "react";
import { useParams } from "react-router-dom";
import MuseumModelCanvas from "../components/Museum/MuseumModel";
import { useResponsiveContext } from "../context/ResponsiveContext";

const Museum = ({ isDarkMode }) => {
  const { isMobile, isTablet } = useResponsiveContext();
  const { modelName } = useParams();
  const decodedName = modelName ? decodeURIComponent(modelName) : "Modelo 3D";

  return (
    <div className={`w-screen h-screen -mt-5 ${
      isDarkMode 
        ? "bg-[#141729] text-gray-100"
        : "bg-gray-50 text-gray-800"
    }`}>
      <h1 className={`text-center ${
        isMobile ? 'text-4xl' : isTablet ? 'text-5xl' : 'text-6xl'
      } font-bold mt-5 ${
        isDarkMode ? "text-gray-100" : "text-gray-800"
      }`}>
        {decodedName}
      </h1>
      <div className={`w-full ${isMobile ? 'h-1/2' : 'h-2/3'}`}>
        <MuseumModelCanvas />
      </div>
    </div>
  );
};

export default Museum;