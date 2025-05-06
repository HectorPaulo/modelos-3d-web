import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MuseumModelCanvas from "../Components/Museum/MuseumModel";
import { useResponsiveContext } from "../context/ResponsiveContext";
import { getModelConfig } from "../utils/ModelRegistry";
import Loader from "../Components/Loader/Loader";

const Museum = ({ isDarkMode }) => {
  const { isMobile, isTablet } = useResponsiveContext();
  const { modelName } = useParams();
  const decodedName = modelName ? decodeURIComponent(modelName) : "Modelo no encontrado";
  const [isLoading, setIsLoading] = useState(true);
  const [modelConfig, setModelConfig] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          color: "#ff0000",
        });
      }

      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [decodedName]);

  if (isLoading) {
    return (
      <div
        className={`flex items-center justify-center h-screen w-screen ${
          isDarkMode ? "bg-[#141729]" : "bg-gray-50"
        }`}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div
      className={`w-screen flex flex-col ${
        isDarkMode ? "bg-[#141729] text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Encabezado */}
      <div className="flex-none">
        <h1
          className={`text-center ${
            isMobile ? "text-4xl" : isTablet ? "text-5xl" : "text-6xl"
          } font-bold mt-2 ${
            isDarkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          {decodedName}
        </h1>
        <div className="text-center text-sm mb-4">
          <span
            className={`inline-block px-3 py-1.5 rounded-xl text-white font-semibold ${
              isDarkMode ? "bg-blue-700" : "bg-[#141729]"
            }`}
          >
            Formato: {modelConfig?.modelType?.toUpperCase() || "Desconocido"}
          </span>
        </div>
      </div>

      {/* Contenedor principal */}
      <div
        className={`flex ${
          isMobile || isTablet ? "flex-col min-h-screen" : "flex-row min-h-screen"
        }`}
      >
        {/* Modelo 3D */}
        <div
          className={`${
            isMobile || isTablet ? "w-full" : "w-2/3"
          } relative`}
        >
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
              scale={[1, 1, 1]}
            />
          </div>
        </div>

        {/* Descripción */}
        <div
          className={`${
            isMobile || isTablet ? "w-full p-4" : "w-1/3 p-6 h-full"
          } flex flex-col justify-center`}
        >
          <div
            className={`${
              isDarkMode ? "bg-[#1a1f3c] text-gray-100" : "text-gray-800"
            } p-4 h-full`}
          >
            <h2 className="text-2xl font-bold mb-4 lg:text-4xl">Descripción</h2>
            <p className="text-base leading-relaxed">
              {modelConfig?.description || "Descripción no disponible."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Museum;