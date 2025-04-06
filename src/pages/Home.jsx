import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Carousel from "../components/Carrusel/Carousel"; // Asegúrate de importar el componente Carousel
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
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

        // Reducir el tamaño de la imagen de fondo al hacer scroll
        gsap.to(backgroundRef.current, {
            scrollTrigger: {
                trigger: backgroundRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
            scale: 0.8,
            transformOrigin: "center center",
        });
    }, []);

    const handleMouseEnter = (index) => {
        gsap.to(cardRefs.current[index], {
            height: "300px", // Altura expandida
            duration: 0.5,
            ease: "power2.out",
        });
        gsap.to(imgRefs.current[index], {
            opacity: 1, // Mostrar la imagen
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
        <div className="min-h-full">
            <div
                ref={backgroundRef}
                className="lg:h-[650px] md:h-[500px] h-70"
                style={{
                    backgroundImage: "url('/src/assets/3m1.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div ref={headerRef} className="relative">
                    <div className="mx-auto flex justify-center px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-7xl font-black tracking-widest text-gray-900">
                            MODELOS
                        </h1>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                  <Carousel /> 
                </div>
            </div>
            <div ref={contentRef}>
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                ref={(el) => (cardRefs.current[index] = el)}
                                className="bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer relative"
                                style={{ height: "100px" }} // Altura inicial
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                            >
                                <h2 className="text-gray-900 text-xl font-bold p-4">
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