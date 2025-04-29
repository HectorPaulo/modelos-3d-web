import React from "react";
import { useParams } from "react-router-dom";
import MuseumModelCanvas from "../components/Museum/MuseumModel";

const Museum = () => {
  // Obtiene el nombre del modelo de los parámetros de la URL
  const { modelName } = useParams();
  
  // Decodifica el nombre para mostrar correctamente (por si tiene espacios o caracteres especiales)
  const decodedName = modelName ? decodeURIComponent(modelName) : "Modelo 3D";

  return (
    <div className="w-screen h-screen bg-white -mt-4 text-white">
      <h1 className="text-center text-6xl font-bold my-4">{decodedName}</h1>
      <div className="w-full h-full">
        <MuseumModelCanvas />
      </div>
    </div>
  );
};

export default Museum;