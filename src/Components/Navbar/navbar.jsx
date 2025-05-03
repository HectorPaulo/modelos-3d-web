import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { useResponsiveContext } from "../../context/ResponsiveContext";

const Navbar = ({ isDarkMode, toggleTheme, isAutoTheme, toggleAutoTheme }) => {
    const { isMobile } = useResponsiveContext();
    const navbarRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            navbarRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
        );
    }, []);

    return (
        <nav ref={navbarRef} className={`sticky top-0 z-50 ${
            isDarkMode ? "bg-[#141729]" : "bg-gray-900"
        }`}>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-2">
                <div className="relative flex h-14 sm:h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <img
                                className="h-8 w-auto sm:h-10"
                                src="/Assets/vite.png"
                                alt="Modelos 3D"
                            />
                            <span className="ml-2 text-white font-medium hidden sm:block">
                                Universidad La Salle Oaxaca | Biblioteca de Modelos 3D
                            </span>
                        </Link>
                    </div>
                    
                    {/* Toggle de tema */}
                    <div className="flex items-center space-x-2">
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
        </nav>
    );
};

export default Navbar;
