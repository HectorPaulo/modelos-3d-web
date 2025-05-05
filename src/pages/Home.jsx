/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate, Link } from "react-router-dom"; 
import BlurText from "../TextAnimations/BlurText/BlurText";
import Aurora from "../Backgrounds/Aurora/Aurora";
import MuseumModelCanvas from "../Components/Museum/MuseumModel"; 
import { useResponsiveContext } from "../context/ResponsiveContext";
import { getModelConfig, getAllModels } from "../utils/ModelRegistry";
import ImageInput from "../Components/ImageInput/ImageInput";
import ComparisonModal from "../Components/Modal/ComparisionModal";
import Loader from "../Components/Loader/Loader";
import Alert from "../Components/Alert/Alert";
import SplineModel from "../Components/Models/SplineModel";

gsap.registerPlugin(ScrollTrigger);

export default function Home({ isDarkMode }) {
    const { isMobile } = useResponsiveContext();
    const headerRef = useRef(null);
    const contentRef = useRef(null);
    const backgroundRef = useRef(null);
    const navigate = useNavigate(); 

    const cardRefs = useRef([]);
    const imgRefs = useRef([]);
    
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
            formData.append('file', selectedImage); 
            
            console.log("Enviando solicitud a la API...");
            
            const response = await fetch('https://monumentos-historicos-e45c66f49b57.herokuapp.com/predict', {
                method: 'POST',
                body: formData,
                credentials: 'omit',
            });
            
            if (!response.ok) {
                console.error('Error Response:', {
                    status: response.status,
                    statusText: response.statusText,
                    headers: Object.fromEntries([...response.headers]),
                    body: await response.text()
                });
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log("Respuesta completa de la API:", data);
            
            if (data && data.monument) {
                console.log("Monumento reconocido:", data.monument);
                setModelResponse(data.monument);
                setIsModalOpen(true);
            } else {
                console.log("No se reconoció el monumento. Datos recibidos:", data);
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
        
        // Intentar encontrar una coincidencia aproximada si no hay una exacta
        const allModels = getAllModels();
        const modelNames = Object.keys(allModels);
        
        // Buscar coincidencias parciales
        const similarModelName = modelNames.find(name => 
            name.toLowerCase().includes(monumentName.toLowerCase()) || 
            monumentName.toLowerCase().includes(name.toLowerCase())
        );
        
        const nameToNavigate = similarModelName || monumentName;
        navigate(`/museum/${encodeURIComponent(nameToNavigate)}`);
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

        // Rectángulos izquierdos - animación de entrada
        gsap.fromTo(
            leftRect1Ref.current,
            { height: 0, opacity: 0 },
            { height: "100vh", opacity: 1, duration: 14.4, ease: "power3.out" }
        );
        
        gsap.fromTo(
            leftRect2Ref.current,
            { height: 0, opacity: 0 },
            { height: "99vh", opacity: 1, duration: 18.0, ease: "power3.out", delay: 2.4 }
        );
        
        // Rectángulos derechos - animación de entrada
        gsap.fromTo(
            rightRect1Ref.current,
            { height: 0, opacity: 0 },
            { height: "100vh", opacity: 1, duration: 14.4, ease: "power3.out", delay: 3.6 }
        );
        
        gsap.fromTo(
            rightRect2Ref.current,
            { height: 0, opacity: 0 },
            { height: "110vh", opacity: 1, duration: 18.0, ease: "power3.out", delay: 6.0 }
        );
        
        // Animaciones continuas para cada rectángulo - ahora 12 veces más lentas que las originales
        gsap.to(leftRect1Ref.current, {
            height: "150vh", 
            duration: 24, // 12x más lento que el original
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        
        gsap.to(leftRect2Ref.current, {
            height: "140vh",
            duration: 30, // 12x más lento
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 6.0
        });
        
        gsap.to(rightRect1Ref.current, {
            height: "150vh",
            duration: 27.6, // 12x más lento
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 3.6
        });
        
        gsap.to(rightRect2Ref.current, {
            height: "140vh",
            duration: 33.6, // 12x más lento
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 8.4
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

    if (isLoading) {
        return (
            <div className={`flex items-center justify-center h-screen w-screen ${isDarkMode ? "bg-[#141729]" : "bg-gray-50"}`}>
                <Loader />
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${isDarkMode ? "bg-black text-gray-100" : " text-gray-200"} relative`}>
            
            {/* Rectángulos verticales decorativos - Izquierda - ahora solo visibles en pantallas md+ */}
            <div 
                ref={leftRect1Ref}
                className="hidden md:block absolute left-6 bottom-0 w-24 z-[-1] origin-botto</div>m rounded-t-full" 
                style={{
                    background: "linear-gradient(to top, #2</div>92E50)"
                }}
            ></div>
            
            <div 
                ref={leftRect2Ref}
                className="hidden md:block absolute left-24 top-0 w-20 z-[-1] origin-top rounded-b-full" 
                style={{
                    background: "linear-gradient(to bottom, #A62932)"
                }}
            ></div>
            
            {/* Rectángulos verticales decorativos - Derecha - ahora solo visibles en pantallas md+ */}
            <div 
                ref={rightRect1Ref}
                className="hidden md:block absolute right-6 bottom-0 w-24 z-[-1] origin-bottom rounded-t-full" 
                style={{
                    background: "linear-gradient(to top, #292E50)"
                }}
            ></div>
            
            <div 
                ref={rightRect2Ref}
                className="hidden md:block absolute right-24 top-0 w-20 z-[-1] origin-top rounded-b-full"
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
                        ? "relative pt-50 lg:h-[500px] md:h-[500px] h-[400px] transition-all duration-200" 
                        : "relative lg:h-[900px] md:h-[550px] h-[450px] pt-10 sm:pt-20 transition-all duration-200 overflow-hidden rounded-b-full"
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
                                delay={200}
                                animateBy="letters"
                                direction="bottom"
                                className={`text-gray-200 mt-30 text-6xl sm:text-5xl lg:text-9xl font-black ${
                                    isDarkMode ? "mt-20 sm:mt-40" : ""
                                }`}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row-reverse items-start justify-center sm:mt-20 pb-10">
                <div className=" sm:mt-20 w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/3">
                    <h2 className={`font-black mb-4 text-5xl ${isDarkMode ? "text-white" : "text-[#141729]"}`}>
                        Comparar fotografía de un monumento histórico
                    </h2>

                    <ImageInput
                        value={selectedImage}
                        onChange={handleImageChange}
                        maxSize={10}
                        label="Sube una imagen"
                        accept="image/png, image/jpeg"
                        aspectRatio="16/9"
                    />

                    {selectedImage && (
                        <p className={`mt-4 ${isDarkMode ? "text-gray-300" : "text-gray-800"}`}>
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

                {/* Contenedor de SplineModel con superposición */}
                <div className="relative w-3/5 h-full hidden lg:block"> {/* Mostrar solo en pantallas grandes */}
                    {/* Div superpuesto para capturar clics */}
                    <div
                        className="absolute inset-0 z-30 cursor-pointer"
                        onClick={() => navigate("/library")}
                    ></div>

                    <div className="w-150 h-150 rounded-full  z-[-10] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

<div className="relative z-20">

                    <SplineModel isDarkMode={isDarkMode} />
</div>
                </div>
            </div>
        </div>
    );
}