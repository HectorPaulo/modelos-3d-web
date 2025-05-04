import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom"; 
import Carousel from "../Components/Carrusel/Carousel";
import BlurText from "../TextAnimations/BlurText/BlurText";
import Aurora from "../Backgrounds/Aurora/Aurora";
import MuseumModelCanvas from "../Components/Museum/MuseumModel"; 
import { useResponsiveContext } from "../context/ResponsiveContext";
import { getModelConfig } from "../utils/ModelRegistry";
import ImageInput from "../Components/ImageInput/ImageInput";
import ComparisonModal from "../Components/Modal/ComparisionModal";
import Loader from "../Components/Loader/Loader";
import Alert from "../Components/Alert/Alert";

gsap.registerPlugin(ScrollTrigger);

export default function Home({ isDarkMode }) {
    const { isMobile } = useResponsiveContext();
    const headerRef = useRef(null);
    const contentRef = useRef(null);
    const backgroundRef = useRef(null);
    const navigate = useNavigate(); 

    const cardRefs = useRef([]);
    const imgRefs = useRef([]);
    
    // Referencias para los rectángulos decorativos
    const leftRect1Ref = useRef(null);
    const leftRect2Ref = useRef(null);
    const rightRect1Ref = useRef(null);
    const rightRect2Ref = useRef(null);

    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [modelResponse, setModelResponse] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertType, setAlertType] = useState('error');
    const [showAlert, setShowAlert] = useState(false);

    const handleImageChange = (file) => {
        setSelectedImage(file);
        setErrorMessage(null);
    }

    const handleSearchModel = async () => {
        if (!selectedImage) {
            setAlertMessage("Por favor selecciona una imagen primero");
            setAlertType("warning");
            setShowAlert(true);
            return;
        }
        
        setIsLoading(true);
        setErrorMessage(null);
        
        try {
            const formData = new FormData();
            formData.append('image', selectedImage);
            
            const response = await fetch('https://monumentos-historicos-e45c66f49b57.herokuapp.com/predict', {
                method: 'POST',
                body: formData,
            });
            
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            if (data && data.monument_name) {
                setModelResponse(data.monument_name);
                setIsModalOpen(true);
            } else {
                setAlertMessage("No se pudo identificar el monumento en la imagen");
                setAlertType("info");
                setShowAlert(true);
            }
        } catch (error) {
            console.error("Error al buscar el modelo:", error);
            setAlertMessage("Error al procesar la imagen. Inténtalo de nuevo.");
            setAlertType("error");
            setShowAlert(true);
        } finally {
            setIsLoading(false);
        }
    };

    const navigateToModel = (monumentName) => {
        setIsModalOpen(false);
        navigate(`/museum/${encodeURIComponent(monumentName)}`);
    };

    useEffect(() => {
        gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
        );

        gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.5 }
        );

        // Animaciones para los rectángulos decorativos
        // Rectángulos izquierdos - animación de entrada
        gsap.fromTo(
            leftRect1Ref.current,
            { height: 0, opacity: 0 },
            { height: "100vh", opacity: 1, duration: 1.2, ease: "power3.out" }
        );
        
        gsap.fromTo(
            leftRect2Ref.current,
            { height: 0, opacity: 0 },
            { height: "99vh", opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.2 }
        );
        
        // Rectángulos derechos - animación de entrada
        gsap.fromTo(
            rightRect1Ref.current,
            { height: 0, opacity: 0 },
            { height: "100vh", opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
        );
        
        gsap.fromTo(
            rightRect2Ref.current,
            { height: 0, opacity: 0 },
            { height: "110vh", opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.5 }
        );
        
        // Animaciones continuas para cada rectángulo
        gsap.to(leftRect1Ref.current, {
            height: "150vh", 
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        
        gsap.to(leftRect2Ref.current, {
            height: "140vh",
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 0.5
        });
        
        gsap.to(rightRect1Ref.current, {
            height: "150vh",
            duration: 2.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 0.3
        });
        
        gsap.to(rightRect2Ref.current, {
            height: "140vh",
            duration: 2.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 0.7
        });

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = window.innerHeight; 
            const scale = Math.max(0.8, 1 - scrollY / maxScroll); 

            if (backgroundRef.current) {
                backgroundRef.current.style.transform = `scale(${scale})`;
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isDarkMode]);

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

    const cards = [
        {
            name: "Bacija de barro",
            path: "/museum",
            modelType: "obj",
            modelPath: "/Models/Museum/output.obj",
            texturePath: "/Models/Museum/baked_mesh_tex0.png",
            normalMapPath: "/Models/Museum/baked_mesh_norm0.png"
        },
        {
            name: "Fuente de las 8 regiones",
            path: "/museum",
            ...getModelConfig("Fuente de las 8 regiones")
        }
    ];

    return (
        <div className={`min-h-screen ${isDarkMode ? "bg-black text-gray-100" : " text-gray-200"} relative`}>
            
            {/* Rectángulos verticales decorativos - Izquierda */}
            <div 
                ref={leftRect1Ref}
                className="absolute left-6 bottom-0 w-24 z-[-1] origin-bottom rounded-t-full" 
                style={{
                    background: "linear-gradient(to top, #292E50)"
                }}
            ></div>
            
            <div 
                ref={leftRect2Ref}
                className="absolute left-24 top-0 w-20 z-[-1] origin-top rounded-b-full" 
                style={{
                    background: "linear-gradient(to bottom, #A62932)"
                }}
            ></div>
            
            {/* Rectángulos verticales decorativos - Derecha (orden invertido) */}
            <div 
                ref={rightRect1Ref}
                className="absolute right-6 bottom-0 w-24 z-[-1] origin-bottom rounded-t-full" 
                style={{
                    background: "linear-gradient(to top, #292E50)"
                }}
            ></div>
            
            <div 
                ref={rightRect2Ref}
                className="absolute right-24 top-0 w-20 z-[-1] origin-top rounded-b-full"
                style={{
                    background: "linear-gradient(to bottom, #A62932)"
                }}
            ></div>

            {isLoading && <Loader />}
            
            <Alert 
                message={alertMessage}
                type={alertType}
                show={showAlert}
                onClose={() => setShowAlert(false)}
                autoClose={true}
                autoCloseTime={4000}
            />
            
            <ComparisonModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                userImage={selectedImage}
                monumentName={modelResponse}
                navigateToModel={navigateToModel}
            />
            
            <div
                ref={backgroundRef}
                className={`${
                    isDarkMode 
                        ? "relative lg:h-[670px] md:h-[500px] h-70 transition-all duration-200" 
                        : "relative lg:h-[900px] md:h-[550px] h-100 pt-20 transition-all duration-200 overflow-hidden rounded-b-full"
                } `}
                style={{
                    transformOrigin: "center center",
                    transition: "transform 0.1s, border-radius 0.1s",
                }}
            >
                <div className="absolute inset-0 z-0">
                    {isDarkMode ? (
                        <Aurora
                            colorStops={["#292E50", "#FF94B4", "#A62932"]}
                            blend={0.5}
                            amplitude={1.0}
                            speed={0.5}
                        />
                    ) : (
                        <div className="absolute bg-[#292E50] w-full h-svh">

                        </div>
                    )}
                </div>

                <div className="relative z-10">
                    <div ref={headerRef} className="mx-auto flex justify-center px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center justify-center space-y-25">
                            <BlurText
                                text="BiMo"
                                delay={400}
                                animateBy="letters"
                                direction="bottom"
                                className={`text-gray-200 mt-30 mb-40 text-5xl sm:text-5xl lg:text-9xl font-black ${
                                    isDarkMode ? "mt-20 sm:mt-40" : ""
                                }`}
                            />
                            <Carousel />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-20 px-4 mx-auto w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/3">
                <h2 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-white" : "text-[#141729]"}`}>Comparar fotografía de un monumento histórico</h2>

                <ImageInput 
                    value={selectedImage}
                    onChange={handleImageChange}
                    maxSize={10}
                    label="Sube una imagen"
                    accept="image/png, image/jpeg"
                    aspectRatio="16/9"
                />

                {selectedImage && (
                    <p className={`mt-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Imagen seleccionada: {selectedImage.name} ({(selectedImage.size / 1024).toFixed(2)} KB)
                    </p>
                )}
                
                {errorMessage && (
                    <p className="mt-2 text-red-500">{errorMessage}</p>
                )}
                
                <div className="flex justify-center">
                    <button
                        onClick={handleSearchModel}
                        disabled={!selectedImage || isLoading}
                        className={`my-2 rounded-md p-2 font-semibold text-lg w-xs mt-5 border-b-4 border-l-4 border-t-2 border-r-2 cursor-pointer hover:bg-gradient-to-b hover:from-[#343d74] hover:to-[#3e4dac] hover:scale-105 hover:text-white
                            ${isDarkMode ? "text-white" : "text-black"} border-[#343d74]
                            ${(!selectedImage || isLoading) ? " cursor-not-allowed" : ""}
                        `}
                    >
                        {isLoading ? "Procesando..." : "Buscar modelo"}
                    </button>
                </div>
            </div>
            <div ref={contentRef}>
                <div className={`mx-auto mt-0 max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 place-items-center">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                ref={(el) => (cardRefs.current[index] = el)}
                                className={`w-full max-w-md relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer mx-auto ${
                                    isDarkMode 
                                        ? "bg-[#141729] border-gray-700 mt-10 sm:mt-20 md:mt-40" 
                                        : "bg-white/30 border-[#aeceb2]"
                                }`}
                                style={{ 
                                    height: isMobile ? "100px" : "150px",
                                    boxShadow: isDarkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.5)' : 'none'
                                }}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                                onClick={() => handleCardClick(card.path, card.name)}
                            >
                                <div className="absolute top-2 right-2 z-30 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                    {card.modelType === 'stl' ? 'STL' : 'OBJ'}
                                </div>
                                
                                <div className="h-full w-full">
                                    <MuseumModelCanvas 
                                        modelPath={card.modelPath}
                                        modelType={card.modelType}
                                        texturePath={card.texturePath}
                                        normalMapPath={card.normalMapPath}
                                        color={card.color}
                                        autoRotate={true}
                                        background={isDarkMode ? "#141729" : "transparent"}
                                    />
                                    <div className={`absolute bottom-0 left-0 w-full py-2 text-center font-semibold text-2xl 
                                        ${isDarkMode ? "bg-gray-800/70 text-gray-200" : "bg-white/70 text-gray-800"}`}
                                    >
                                        {card.name}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}