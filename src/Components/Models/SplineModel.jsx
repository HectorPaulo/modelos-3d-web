import React from "react";
import { useResponsiveContext } from "../../context/ResponsiveContext";

const SplineModel = ({ isDarkMode }) => {
  const { isMobile, isTablet } = useResponsiveContext();

  return (
    <div className="relative w-full h-full ">
    {/* Div que cubre el logo con fondo dinámico */}
    <div
        className="absolute bottom-0 right-0 z-10 w-1/4 h-1/6 rounded-full"
        style={{
            backgroundColor: isDarkMode ? "black" : "white",
            pointerEvents: "none", // Evita que interfiera con la interacción del modelo
        }}
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
  );
};

export default SplineModel;