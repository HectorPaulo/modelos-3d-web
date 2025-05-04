import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MuseumModelCanvas from "../Components/Museum/MuseumModel";
import { useResponsiveContext } from "../context/ResponsiveContext";
import { getModelConfig } from "../utils/ModelRegistry";

const Museum = ({ isDarkMode }) => {
  const { isMobile, isTablet } = useResponsiveContext();
  const { modelName } = useParams();
  const decodedName = modelName ? decodeURIComponent(modelName) : "Modelo no encontrado";
  const [isLoading, setIsLoading] = useState(true);
  const [modelConfig, setModelConfig] = useState(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const config = getModelConfig(decodedName);
      if (config) {
        setModelConfig(config);
      } else {
        setModelConfig({});
      }

      if (!config || Object.keys(config).length === 0) {
        setModelConfig({
          modelPath: "/Models/Error/objError.obj",
          modelType: "obj",
          color: "#ff0000"
        });
      }

      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [decodedName]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-screen w-screen ${
        isDarkMode ? "bg-[#141729]" : "bg-gray-50"
      }`}>
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-transparent text-blue-800 text-4xl animate-spin flex items-center justify-center border-t-blue-800 rounded-full">
            <div className="w-16 h-16 border-4 border-transparent text-red-700 text-2xl animate-spin flex items-center justify-center border-t-red-700 rounded-full">
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-screen flex flex-col ${
      isDarkMode 
        ? "bg-[#141729] text-gray-100"
        : "bg-gray-50 text-gray-800"
    }`}>
      {/* Encabezado con tamaño fijo */}
      <div className="flex-none">
        <h1 className={`text-center ${
          isMobile ? 'text-4xl' : isTablet ? 'text-5xl' : 'text-6xl'
        } font-bold mt-2 ${
          isDarkMode ? "text-gray-100" : "text-gray-800"
        }`}>
          {decodedName}
        </h1>
        
        <div className="text-center text-sm mb-4">
          <span className={`inline-block px-3 py-1.5 rounded-xl text-white font-semibold ${
            isDarkMode ? 'bg-blue-700' : 'bg-[#141729]'
          }`}>
            Formato: {modelConfig?.modelType?.toUpperCase() || "Desconocido"}
          </span>
        </div>
      </div>
      
      {/* Contenedor del modelo que tomará todo el espacio restante */}
      <div className="flex-grow relative" style={{ height: "calc(100vh - 120px)" }}>
        <div className="absolute inset-0">
          <MuseumModelCanvas 
            modelPath={modelConfig?.modelPath}
            modelType={modelConfig?.modelType}
            texturePath={modelConfig?.texturePath}
            normalMapPath={modelConfig?.normalMapPath}
            color={modelConfig?.color}
            autoRotate={false}
            background={isDarkMode ? "#141729" : "transparent"}
            cameraConfig={modelConfig?.camera}
          />
        </div>
      </div>
    </div>
  );
};

export default Museum;