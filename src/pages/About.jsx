import React from "react";
import SplineModel from "/src/Components/Models/SplineModel";
import ScrollVelocity from "../TextAnimations/ScrollVelocity/ScrollVelocity";
import MetaBalls from "/src/Animations/MetaBalls/MetaBalls";
import { useNavigate } from "react-router-dom";

const About = ({ isDarkMode }) => {
  const navigate = useNavigate();
  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "bg-[#1a1f3c] text-white" : "bg-white text-[#292E50]"} p-6`}>
      {/* Título centrado y encima de todo */}

      <div className="flex-grow grid grid-cols-2 items-center">
        {/* MetaBalls - Posicionado detrás */}
        <div className="relative w-full h-full">
          <div className="absolute inset-0 z-0">
            <MetaBalls
              color={isDarkMode ? "#FFFFFF" : "#1a1f3c"} // Cambia el color según el modo
              cursorBallColor={isDarkMode ? "#FFFFFF" : "#1a1f3c"}
              cursorBallSize={1}
              ballCount={20}
              animationSize={30}
              enableMouseInteraction={true}
              enableTransparency={true}
              hoverSmoothness={0.05}
              clumpFactor={1}
              speed={0.3}
            />
          </div>

          {/* SplineModel - Encima de MetaBalls */}
          <div className="absolute inset-0 z-10">
            <div
              className="absolute inset-150 z-30 cursor-pointer h-20 w-60 -ml-64 mt-10 rounded-full "
              onClick={() => navigate("/library")}
            ></div>
            <SplineModel isDarkMode={isDarkMode} />
          </div>
        </div>

        {/* Texto a la derecha */}
        <div className="relative z-20 max-w-4xl mx-auto p-6">
          <h1
            className="relative z-30 text-7xl font-bold w-full mb-20">
            A cerca de BiMo
          </h1>
          <p className="mb-4 text-2xl font-semibold">
            BiMo (Biblioteca de Monumentos) es un proyecto desarrollado para la Universidad La Salle Oaxaca que permite visualizar y explorar modelos 3D de monumentos históricos y culturales.
          </p>
          <p className="mb-4 text-2xl font-semibold">
            Esta plataforma busca preservar y difundir el patrimonio cultural a través de representaciones digitales precisas, facilitando el acceso al conocimiento histórico y arquitectónico.
          </p>
          <p className="mb-8 text-2xl font-semibold">
            Versión 5.6.6 - Desplegado en Firebase y desarrollado con tecnologías web modernas como React | Vite, Three.js y TailwindCSS.
          </p>
        </div>
      </div>

      {/* ScrollVelocity - Manteniendo el efecto */}
      <div className="-mt-50 z-50 w-screen -ml-5">
        <ScrollVelocity
          texts={["Biblioteca de Monumentos", "¡Modelos 3D!"]}
          velocity={100}
          className="custom-scroll-text"
        />
      </div>
    </div>
  );
};

export default About;