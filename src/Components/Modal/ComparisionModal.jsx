import React from 'react';
import MuseumModelCanvas from "../Museum/MuseumModel";
import { getModelConfig } from "../../utils/ModelRegistry";

const ComparisonModal = ({ isOpen, onClose, userImage, monumentName, navigateToModel }) => {
  if (!isOpen) return null;
  
  const modelConfig = getModelConfig(monumentName) || {};
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fondo con blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Contenido del modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl p-6 z-10 animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Monumento identificado: {monumentName}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Imagen del usuario */}
          <div className="flex flex-col">
            <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">Tu imagen</h3>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
              {userImage && (
                <img 
                  src={URL.createObjectURL(userImage)} 
                  alt="Imagen subida por el usuario" 
                  className="object-contain max-h-full"
                />
              )}
            </div>
          </div>
          
          {/* Modelo 3D */}
          <div className="flex flex-col">
            <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">Modelo 3D</h3>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden aspect-video">
              <MuseumModelCanvas 
                modelPath={modelConfig.modelPath}
                modelType={modelConfig.modelType}
                texturePath={modelConfig.texturePath}
                normalMapPath={modelConfig.normalMapPath}
                color={modelConfig.color}
                autoRotate={true}
                background="transparent"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md transition"
          >
            Cerrar
          </button>
          <button
            onClick={() => navigateToModel(monumentName)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
          >
            Ver detalles del modelo
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;