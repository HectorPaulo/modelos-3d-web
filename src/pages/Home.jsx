import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom"; 
import Carousel from "../components/Carrusel/Carousel";
import BlurText from "../TextAnimations/BlurText/BlurText";
import Aurora from "../Backgrounds/Aurora/Aurora";
import MuseumModelCanvas from "../components/Museum/MuseumModel"; 
import { useResponsiveContext } from "../context/ResponsiveContext";

gsap.registerPlugin(ScrollTrigger);

export default function Home({ isDarkMode }) {
    const { isMobile, breakpoint } = useResponsiveContext();
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
        { name: "Bacija de barro", image: null, path: "/museum" }, 
    ];

    return (
        <div className={`min-h-screen ${isDarkMode ? "bg-black text-gray-100" : "bg-white text-gray-200"}`}>
            {/* Sección de encabezado con fondo */}
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
                        <div className="absolute bg-[#141729] w-full h-svh">

                        </div>
                    )}
                </div>

                {/* Contenido principal */}
                <div className="relative z-10">
                    <div ref={headerRef} className="mx-auto flex justify-center px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center justify-center space-y-25">
                            <BlurText
                                text="Biblioteca de modelos"
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

            {/* Sección de contenido principal */}
            <div ref={contentRef}>
                <div className={`mx-auto ${
                    breakpoint === 'xs' || breakpoint === 'sm' ? 'mt-10' :
                    breakpoint === 'md' ? '-mt-40' :
                    breakpoint === 'lg' ? '-mt-20' :
                    'mt-0'
                } max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8`}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                ref={(el) => (cardRefs.current[index] = el)}
                                className={`w-2/3 relative overflow-hidden rounded-xl border-[#aeceb2] transition-all duration-300 cursor-pointer ${
                                    isDarkMode ? "bg-[#141729] rounded border-t-transparent mt-40" : "bg-transparent"
                                }`}
                                style={{ height: isMobile ? "100px" : "150px" }}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                                onClick={() => handleCardClick(card.path, card.name)}
                            >
                                {/* Etiqueta para modelos 3D */}
                                <div className="absolute top-2 right-2 z-30 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                    3D
                                </div>
                                
                                <div className="h-full w-full">
                                    <MuseumModelCanvas />
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