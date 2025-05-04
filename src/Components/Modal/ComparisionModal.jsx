import React, { useEffect, useState } from 'react';
import MuseumModelCanvas from "../Museum/MuseumModel";
import { getModelConfig, getAllModels } from "../../utils/ModelRegistry";

const ComparisonModal = ({ isOpen, onClose, userImage, monumentName, navigateToModel }) => {
  const [modelConfig, setModelConfig] = useState(null);
  const [modelError, setModelError] = useState(false);
  const [matchedModelName, setMatchedModelName] = useState(""); // Variable para guardar el nombre coincidente
  
  useEffect(() => {
    if (monumentName) {
      // Normalizar el nombre para búsqueda
      const normalizedName = monumentName.toLowerCase().trim();
      
      // Intentar encontrar una coincidencia exacta
      let config = getModelConfig(monumentName);
      let foundModelName = monumentName;
      
      // Si no hay coincidencia exacta, buscar una coincidencia parcial mejorada
      if (!config) {
        const allModels = getAllModels();
        const modelNames = Object.keys(allModels);
        
        // Búsqueda específica para kiosko/quiosco con diferentes variantes
        if (normalizedName.includes('kiosko') || normalizedName.includes('quiosco')) {
          config = getModelConfig("Kiosko");
          foundModelName = "Kiosko";
        } 
        // Búsqueda específica para fuente de las 8 regiones
        else if (normalizedName.includes('fuente') && (normalizedName.includes('8') || normalizedName.includes('ocho') || normalizedName.includes('region'))) {
          config = getModelConfig("Fuente de las 8 regiones");
          foundModelName = "Fuente de las 8 regiones";
        }
        // Otras búsquedas más generales
        else {
          // Buscar coincidencias parciales con mayor flexibilidad
          const similarModelName = modelNames.find(name => 
            name.toLowerCase().replace(/\s+/g, ' ').includes(normalizedName.replace(/\s+/g, ' ')) || 
            normalizedName.replace(/\s+/g, ' ').includes(name.toLowerCase().replace(/\s+/g, ' '))
          );
          
          if (similarModelName) {
            config = getModelConfig(similarModelName);
            foundModelName = similarModelName;
          }
        }
      }
      
      if (config) {
        setModelConfig(config);
        setModelError(false);
        setMatchedModelName(foundModelName); // Guardar el nombre del modelo encontrado
      } else {
        // Si no se encuentra ninguna coincidencia
        setModelError(true);
        setMatchedModelName(""); // Limpiar el nombre del modelo
        setModelConfig({
          modelPath: "/Models/Error/objError.obj",
          modelType: "obj",
          color: "#ff0000"
        });
      }
    }
  }, [monumentName]);

  if (!isOpen) return null;
  
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
            <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">
              {modelError ? "Modelo no disponible" : "Modelo 3D"}
            </h3>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden aspect-video">
              {modelConfig && (
                <MuseumModelCanvas 
                  modelPath={modelConfig.modelPath}
                  modelType={modelConfig.modelType || "obj"}
                  texturePath={modelConfig.texturePath}
                  normalMapPath={modelConfig.normalMapPath}
                  color={modelConfig.color || "#808080"}
                  autoRotate={true}
                  background="transparent"
                  cameraConfig={modelConfig.camera}
                />
              )}
            </div>
            {modelError && (
              <p className="text-amber-500 mt-2 text-sm">
                El modelo 3D para este monumento no está disponible en nuestra biblioteca actual.
              </p>
            )}
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
            onClick={() => {
              // Usar el nombre del modelo coincidente que ya encontramos o el original si no hay coincidencia
              navigateToModel(matchedModelName || monumentName);
            }}
            className={`px-4 py-2 ${modelError ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-md transition`}
            disabled={modelError}
          >
            {modelError ? 'Modelo no disponible' : 'Ver detalles del modelo'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;