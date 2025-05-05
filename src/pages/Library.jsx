import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import MuseumModelCanvas from "../Components/Museum/MuseumModel";
import Carousel from "/src/Components/Carrusel/Carousel"
import { useResponsiveContext } from "../context/ResponsiveContext";
import { getModelConfig, getAllModels } from "../utils/ModelRegistry";

export default function Library({ isDarkMode }) {
    const { isMobile } = useResponsiveContext();
    const navigate = useNavigate();
    const contentRef = useRef(null);
    const cardRefs = useRef([]);
    const imgRefs = useRef([]);

    useEffect(() => {
        gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
        );
    }, []);

    const handleMouseEnter = (index) => {
        gsap.to(cardRefs.current[index], {
            height: isMobile ? "200px" : "300px",
            duration: 0.5,
            ease: "power2.out",
        });
        gsap.to(imgRefs.current[index], {
            opacity: 1, 
            scale: 1.1, 
            duration: 0.5,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = (index) => {
        gsap.to(cardRefs.current[index], {
            height: isMobile ? "100px" : "150px",
            duration: 0.5,
            ease: "power2.out",
        });
        gsap.to(imgRefs.current[index], {
            opacity: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
        });
    };

    const handleCardClick = (path, name) => {
        if (path === "/museum") {
            navigate(`/museum/${encodeURIComponent(name)}`);
        } else {
            navigate(path);
        }
    };

    // Obtener todos los modelos disponibles
    const allModels = getAllModels();
    
    // Dividir modelos en monumentos y objetos
    const objectModels = ["Bacija de barro"]; // Lista de modelos considerados objetos
    
    // Crear dos arrays separados para monumentos y objetos
    const monumentCards = Object.keys(allModels)
        .filter(modelName => !objectModels.includes(modelName))
        .map(modelName => ({
            name: modelName,
            path: "/museum",
            ...getModelConfig(modelName)
        }));
        
    const objectCards = Object.keys(allModels)
        .filter(modelName => objectModels.includes(modelName))
        .map(modelName => ({
            name: modelName,
            path: "/museum",
            ...getModelConfig(modelName)
        }));

    // Función para renderizar cards
    const renderCards = (cards, startIndex) => {
        return cards.map((card, index) => (
            <div
                key={startIndex + index}
                ref={(el) => (cardRefs.current[startIndex + index] = el)}
                className={`w-full max-w-xs relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer mx-auto ${
                    isDarkMode 
                        ? "bg-[#141729] border-gray-700" 
                        : "bg-white/30 border-[#aeceb2]"
                }`}
                style={{ 
                    height: isMobile ? "100px" : "150px",
                    boxShadow: isDarkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.5)' : 'none'
                }}
                onMouseEnter={() => handleMouseEnter(startIndex + index)}
                onMouseLeave={() => handleMouseLeave(startIndex + index)}
                onClick={() => handleCardClick(card.path, card.name)}
            >
                <div className="absolute top-2 right-2 z-30 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {card.modelType === 'stl' ? 'STL' : 'OBJ'}
                </div>
                
                <div className="h-full w-full flex items-center justify-center">
                    <MuseumModelCanvas 
                        modelPath={card.modelPath}
                        modelType={card.modelType}
                        texturePath={card.texturePath}
                        normalMapPath={card.normalMapPath}
                        color={card.color}
                        autoRotate={true}
                        background={isDarkMode ? "#141729" : "transparent"}
                        scale={[0.05, 0.05, 0.05]} // Escala ajustada
                    />
                </div>
                <div className={`absolute bottom-0 left-0 w-full py-2 text-center font-semibold text-xl 
                    ${isDarkMode ? "bg-gray-800/70 text-gray-200" : "bg-white/70 text-gray-800"}`}
                >
                    {card.name}
                </div>
            </div>
        ));
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? "bg-black text-gray-100" : "bg-gray-50 text-gray-800"} py-10`}>
            <div className="container mx-auto px-4">
                <h1 className={`text-6xl sm:text-4xl font-bold text-center mb-35 ${isDarkMode ? "text-white" : "text-[#141729]"}`}>
                    Biblioteca de Monumentos
                </h1>
                <Carousel />
                <div ref={contentRef}>
                    {/* Sección de Monumentos */}
                    <div className="mb-12">
                        <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-[#141729]"} border-b pb-2`}>
                            Monumentos
                        </h2>
                        <div className={`mx-auto mt-0 max-w-7xl px-2 py-4 sm:px-4 lg:px-6`}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 place-items-center">
                                {renderCards(monumentCards, 0)}
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        {/* Sección de Objetos */}
                        <div>
                            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-[#141729]"} border-b pb-2`}>
                                Objetos Históricos
                            </h2>
                            <div className={`mx-auto mt-0 max-w-7xl px-2 py-4 sm:px-4 lg:px-6`}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 place-items-center">
                                    {renderCards(objectCards, monumentCards.length)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}