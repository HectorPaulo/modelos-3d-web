import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { useResponsiveContext } from "../../context/ResponsiveContext";

const Navbar = ({ isDarkMode, toggleTheme, isAutoTheme, toggleAutoTheme }) => {
    const { isMobile } = useResponsiveContext();
    const navbarRef = useRef(null);
    const [isAboutOpen, setIsAboutOpen] = useState(false);

    useEffect(() => {
        gsap.fromTo(
            navbarRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
        );
    }, []);

    const toggleAboutModal = () => {
        setIsAboutOpen(!isAboutOpen);
    }

    return (
        <nav ref={navbarRef} className={`sticky top-0 z-50 ${
            isDarkMode ? "bg-[#141729]" : "bg-[#292E50]"
        }`}>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-2">
                <div className="relative flex h-14 sm:h-16 items-center justify-between">
                    {/* Logo y navegación principal */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <img
                                className="h-8 w-auto sm:h-10"
                                src="/Assets/vite.png"
                                alt="Modelos 3D"
                            />
                            <span className="ml-2 text-white font-medium hidden sm:block">
                                Universidad La Salle Oaxaca | Biblioteca de Monumentos
                            </span>
                        </Link>
                    </div>
                    
                    {/* Enlaces de navegación */}
                    <div className="hidden md:flex items-center">
                        <button 
                            onClick={toggleAboutModal} 
                            className="mx-4 text-white hover:text-indigo-200 transition"
                        >
                            Acerca de BiMo
                        </button>
                    </div>
                    
                    {/* Toggle de tema */}
                    <div className="flex items-center space-x-2">
                        {/* Botón de Acerca de para móviles */}
                        {isMobile && (
                            <button 
                                onClick={toggleAboutModal}
                                className="p-2 mr-2 rounded text-white text-sm hover:bg-indigo-700"
                            >
                                Acerca
                            </button>
                        )}
                        
                        {/* Botón de modo automático */}
                        <button
                            onClick={toggleAutoTheme}
                            className={`hidden sm:flex items-center px-3 py-1 rounded-md text-xs mr-2 ${
                                isAutoTheme 
                                    ? "bg-indigo-600 text-white" 
                                    : "bg-gray-700 text-gray-300"
                            }`}
                        >
                            <span className="mr-1">
                                {isAutoTheme ? "Auto" : "Manual"}
                            </span>
                            <span className="text-xs">
                                {isAutoTheme ? "🌓" : "⚙️"}
                            </span>
                        </button>

                        {isMobile ? (
                            <div className="flex items-center">
                                {/* Botón auto/manual para móviles */}
                                <button
                                    onClick={toggleAutoTheme}
                                    className={`p-2 mr-2 rounded-full ${
                                        isAutoTheme 
                                            ? "bg-indigo-600 text-white" 
                                            : "bg-gray-700 text-gray-300"
                                    }`}
                                >
                                    <span className="text-sm">
                                        {isAutoTheme ? "🌓" : "⚙️"}
                                    </span>
                                </button>
                                
                                {/* Toggle compacto para móviles */}
                                <button 
                                    onClick={toggleTheme} 
                                    className={`p-2 rounded-full ${
                                        isDarkMode ? "bg-gray-700" : "bg-gray-300"
                                    }`}
                                >
                                    {isDarkMode ? (
                                        <span className="text-xl">🌙</span>
                                    ) : (
                                        <span className="text-xl">☀️</span>
                                    )}
                                </button>
                            </div>
                        ) : (
                            // Toggle completo para desktop
                            <label className="relative inline-flex items-center cursor-pointer border-2 rounded-full border-gray-500">
                                <input 
                                    onChange={toggleTheme}
                                    checked={isDarkMode}
                                    className="sr-only peer" 
                                    value="" 
                                    type="checkbox" 
                                />
                                <div className="w-24 h-12 rounded-full ring-0 peer duration-500 outline-none before:bg-yellow-200 overflow-hidden before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center before:content-['☀️'] before:absolute before:h-10 before:w-10 before:top-1/2 before:rounded-full before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full peer-checked:shadow-lg after:content-['🌑'] after:absolute after:bg-[#1d1d1d] after:rounded-full after:top-[4px] after:right-1 after:translate-y-full after:w-10 after:h-10 after:opacity-0 after:transition-all after:duration-700 peer-checked:after:opacity-100 peer-checked:after:rotate-180 peer-checked:after:translate-y-0"></div>
                            </label>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Modal de Acerca de */}
            {isAboutOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 sm:pt-32">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleAboutModal}></div>
                    <div className={`relative max-w-lg w-full mx-4 p-6 rounded-lg shadow-lg ${isDarkMode ? "bg-[#1a1f3c]" : "bg-white"}`}>
                        <button 
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" 
                            onClick={toggleAboutModal}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-800"}`}>Acerca de BiMo</h2>
                        <div className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                            <p className="mb-4">
                                BiMo (Biblioteca de Monumentos) es un proyecto desarrollado para la Universidad La Salle Oaxaca que permite visualizar y explorar modelos 3D de monumentos históricos y culturales.
                            </p>
                            <p className="mb-4">
                                Esta plataforma busca preservar y difundir el patrimonio cultural a través de representaciones digitales precisas, facilitando el acceso al conocimiento histórico y arquitectónico.
                            </p>
                            <p>
                                Versión 2.9.5 - Desarrollado con tecnologías web modernas como React, Three.js y TailwindCSS.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
