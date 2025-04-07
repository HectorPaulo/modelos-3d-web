import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Carousel from "../components/Carrusel/Carousel"; // Asegúrate de importar el componente Carousel
gsap.registerPlugin(ScrollTrigger);

export default function Home({ isDarkMode }) { // Recibir isDarkMode como prop
    const headerRef = useRef(null);
    const contentRef = useRef(null);
    const backgroundRef = useRef(null);

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
                className={`lg:h-[650px] md:h-[500px] h-70 ${isDarkMode ? "bg-dark" : "bg-light"} transition-all duration-300`}
                style={{
                    transformOrigin: "center center",
                    transition: "transform 0.1s, border-radius 0.1s",
                }}
            >
                <div ref={headerRef} className="relative">
                    <div className="mx-auto flex justify-center px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-8xl font-black tracking-widest">
                            MODELOS
                        </h1>
                    </div>
                </div>
                <div className="flex mt-20 justify-center">
                    <Carousel />
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
                                <h2 className={`absolute top-0 left-0 text-center w-full h-full flex items-center justify-center text-2xl font-bold transition-opacity duration-300 ${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"}`}>
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