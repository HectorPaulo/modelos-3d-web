import React from "react";
import { useNavigate } from "react-router-dom";
import { useResponsiveContext } from "../../context/ResponsiveContext";

const SplineModel = ({ isDarkMode }) => {
  const { isMobile, isTablet } = useResponsiveContext();
  const navigate = useNavigate();

  return (
    <>
    
            <div className=" w-150 h-150 rounded-full  z-[-10] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
    <div className="relative  w-full h-full ">
    {/* Div que cubre el logo con fondo dinámico */}
    <div
        className="absolute bottom-0 right-0 z-10 w-1/4 h-1/6 mb-4"
        style={{
          backgroundColor: isDarkMode ? "#1a1f3c" : "white",
          pointerEvents: "none",
        }}
        onClick={() => navigate("/library")}
        ></div>

    {/* Mostrar el modelo solo en pantallas grandes */}
      {!isMobile && !isTablet ? (
        <spline-viewer
        url="https://prod.spline.design/6m3NLKHmOhU8y1X0/scene.splinecode"
        style={{ width: "100%", height: "100%" }}
        ></spline-viewer>
      ) : (
        // Botón en pantallas medianas y pequeñas
        <div className="flex items-center justify-center w-full h-full">
          <button
            onClick={() => alert("Modelo no disponible en esta vista")}
            className={`px-4 py-2 rounded-lg font-semibold text-lg ${
              isDarkMode
              ? "bg-gray-800 text-white hover:bg-gray-700"
              : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
            >
            Ver modelo
          </button>
        </div>
      )}
    </div>
      </>
  );
};

export default SplineModel;