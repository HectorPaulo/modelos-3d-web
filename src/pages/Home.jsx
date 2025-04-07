import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Carousel from "../components/Carrusel/Carousel"; // Asegúrate de importar el componente Carousel
import BlurText from "../TextAnimations/BlurText/BlurText";
import Aurora from "../Backgrounds/Aurora/Aurora"; // Importa el componente Aurora
import Iridescence from "../Backgrounds/Iridescence/Iridescence"; // Importa el componente Iridescence

gsap.registerPlugin(ScrollTrigger);

export default function Home({ isDarkMode }) { // Recibir isDarkMode como prop
    const headerRef = useRef(null);
    const contentRef = useRef(null);
    const backgroundRef = useRef(null);
    const handleAnimationComplete = () => {
        console.log("Animation complete!");
    };

    // Crear referencias para las tarjetas y las imágenes
    const cardRefs = useRef([]);
    const imgRefs = useRef([]);

    useEffect(() => {
        // Animar el encabezado
        gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
        );

        // Animar el contenido principal
        gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.5 }
        );

        // Animación de la imagen de fondo al hacer scroll
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = window.innerHeight; // Altura máxima para aplicar el efecto
            const scale = Math.max(0.8, 1 - scrollY / maxScroll); // Reducir el tamaño

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
            height: "300px", // Altura expandida
            duration: 0.5,
            ease: "power2.out",
        });
        gsap.to(imgRefs.current[index], {
            opacity: 1, // Mostrar la imagen
            scale: 1.1, // Expandir ligeramente la imagen
            duration: 0.5,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = (index) => {
        gsap.to(cardRefs.current[index], {
            height: "100px", // Altura colapsada
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

    const cards = [
        { name: "Iglesia", image: "/src/assets/ModelImages/iglesia1.jpeg" },
        { name: "Armadura de hierro con protección V", image: "/src/assets/ModelImages/armadura2.jpeg" },
        { name: "Cruz de piedra", image: "/src/assets/ModelImages/cruz-de-piedra1.jpeg" },
        { name: "Teatro macedonio alcalá", image: "/src/assets/ModelImages/teatro-macedonio-alcala-3.jpeg" },
        { name: "Iglesia de Santo Domingo", image: "/src/assets/ModelImages/sto-domingo3.jpeg" },
        { name: "Estatua de Dn. Porfirio Díaz", image: "/src/assets/ModelImages/porfirio-diaz3.jpeg" },
    ];

    return (
        <div className={`min-h-full ${isDarkMode ? "bg-black text-gray-100" : "bg-white text-gray-200"}`}>
            {/* Sección de encabezado con fondo */}
            <div
                ref={backgroundRef}
                className={`${isDarkMode ? "relative lg:h-[650px] md:h-[500px] h-70 transition-all duration-300" : "relative lg:h-[650px] md:h-[550px] h-100 pt-20 transition-all duration-300 overflow-hidden rounded-b-full"} `}
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
                        <Iridescence
                            color={[1, 1, 1]}
                            mouseReact={false}
                            amplitude={0.1}
                            speed={1.0}
                        />
                    )}
                </div>

                {/* Contenido principal */}
                <div className="relative z-10">
                    <div ref={headerRef} className="mx-auto flex justify-center px-4 py-6 sm:px-6 lg:px-8 pt-20">
                        <BlurText
                            text="¡MODELOS 3D!"
                            delay={400}
                            animateBy="letters"
                            direction="bottom"
                            onAnimationComplete={handleAnimationComplete}
                            className="text-7xl lg:text-9xl font-black text-gray-800 "
                            />
                    </div>
                    <div className="flex justify-center">
                        <Carousel />
                    </div>
                </div>
            </div>

            {/* Sección de contenido principal */}
            <div ref={contentRef}>
                <div className="mx-auto mt-10 max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                ref={(el) => (cardRefs.current[index] = el)}
                                className={`relative overflow-hidden rounded-b-xl border-t-2 border-[#aeceb2] transition-all duration-300 ${isDarkMode ? "bg-gray-800 rounded border-t-transparent" : "bg-white"}`}
                                style={{ height: "100px" }}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                            >
                                <h2  className={`absolute top-0 left-0 text-center w-full h-full flex items-center justify-center text-2xl font-bold transition-opacity duration-300 ${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}>
                                    {card.name}
                                </h2>
                                <img
                                    ref={(el) => (imgRefs.current[index] = el)}
                                    src={card.image}
                                    alt={card.name}
                                    className="absolute top-0 left-0 w-full h-full object-cover opacity-0"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}