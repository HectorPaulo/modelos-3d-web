import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import Carousel from "../components/Carrusel/Carousel";
import BlurText from "../TextAnimations/BlurText/BlurText";
import Aurora from "../Backgrounds/Aurora/Aurora";
import Iridescence from "../Backgrounds/Iridescence/Iridescence";
import MuseumModelCanvas from "../components/Museum/MuseumModel"; 

gsap.registerPlugin(ScrollTrigger);

export default function Home({ isDarkMode }) {
    const headerRef = useRef(null);
    const contentRef = useRef(null);
    const backgroundRef = useRef(null);
    const navigate = useNavigate(); 

    const cardRefs = useRef([]);
    const imgRefs = useRef([]);

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
    }, []);

    const handleMouseEnter = (index) => {
        gsap.to(cardRefs.current[index], {
            height: window.innerWidth < 640 ? "200px" : "300px",
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
            height: window.innerWidth < 640 ? "100px" : "150px", // Altura colapsada responsive
            duration: 0.5,
            ease: "power2.out",
        });
        gsap.to(imgRefs.current[index], {
            opacity: 0, // Ocultar la imagen
            scale: 1, // Restaurar el tamaño original
            duration: 0.5,
            ease: "power2.out",
        });
    };

    const handleCardClick = (path) => {
        navigate(path); // Redirige al usuario a la ruta especificada
    };

    const cards = [
        { name: "Bacija de barro", image: null, path: "/museum" }, 
    ];

    return (
        <div className={`min-h-screen ${isDarkMode ? "bg-black text-gray-100" : "bg-white text-gray-200"}`}>
            {/* Sección de encabezado con fondo */}
            <div
                ref={backgroundRef}
                className={`${
                    isDarkMode 
                        ? "relative lg:h-[650px] md:h-[500px] h-70 transition-all duration-300" 
                        : "relative lg:h-[650px] md:h-[550px] h-100 pt-20 transition-all duration-300 overflow-hidden rounded-b-full"
                } `}
                style={{
                    transformOrigin: "center center",
                    transition: "transform 0.1s, border-radius 0.1s",
                }}
            >
                {/* Fondo dinámico */}
                <div className="absolute inset-0 z-0">
                    {isDarkMode ? (
                        <Aurora
                            colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
                            blend={0.5}
                            amplitude={1.0}
                            speed={0.5}
                        />
                    ) : (
                        <img src="/src/assets/Backgrounds/abstracto5.jpg" alt="Fondo abstracto 5" />
                    )}
                </div>

                {/* Contenido principal */}
                <div className="relative z-10">
                    <div ref={headerRef} className="mx-auto flex justify-center px-4 sm:px-6 lg:px-8">
                        <BlurText
                            text="¡MODELOS 3D!"
                            delay={400}
                            animateBy="letters"
                            direction="bottom"
                            className={`text-5xl sm:text-7xl lg:text-9xl font-black ${
                                isDarkMode ? "text-gray-200 mt-20 sm:mt-40" : "text-gray-800"
                            }`}
                        />
                    </div>
                </div>
            </div>
            <Carousel />

            {/* Sección de contenido principal */}
            <div ref={contentRef}>
                <div className="mx-auto mt-10 sm:-mt-20 md:-mt-40 max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                ref={(el) => (cardRefs.current[index] = el)}
                                className={`relative overflow-hidden rounded-b-xl border-[#aeceb2] transition-all duration-300 cursor-pointer ${
                                    isDarkMode ? "bg-gray-800 rounded border-t-transparent" : "bg-white"
                                }`}
                                style={{ height: window.innerWidth < 640 ? "100px" : "150px" }} // Altura inicial responsive
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                                onClick={() => handleCardClick(card.path)} // Maneja el clic en la tarjeta
                            >
                                {card.name === "Bacija de barro" ? (
                                    <div className="h-full w-full">
                                        <MuseumModelCanvas /> {/* Renderiza el modelo 3D */}
                                        <div className={`absolute bottom-0 left-0 w-full py-2 text-center 
                                            ${isDarkMode ? "bg-gray-800/70 text-gray-200" : "bg-white/70 text-gray-800"}`}
                                        >
                                            {card.name}
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <h2
                                            className={`absolute top-0 left-0 text-center w-full h-full flex items-center justify-center text-2xl font-bold transition-opacity duration-300 ${
                                                isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
                                            }`}
                                        >
                                            {card.name}
                                        </h2>
                                        <img
                                            ref={(el) => (imgRefs.current[index] = el)}
                                            src={card.image}
                                            className="absolute cursor-pointer top-0 left-0 w-full h-full object-cover opacity-0"
                                        />
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}