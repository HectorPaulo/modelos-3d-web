import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { Link, useNavigate } from "react-router-dom";
import { useResponsiveContext } from "../../context/ResponsiveContext";

const Navbar = ({ isDarkMode, toggleTheme, isAutoTheme, toggleAutoTheme }) => {
    const { isMobile } = useResponsiveContext();
    const navbarRef = useRef(null);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        gsap.fromTo(
            navbarRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
        );
    }, []);

    const toggleAboutModal = () => {
        setIsAboutOpen(!isAboutOpen);
    };

    const handleAboutClick = () => {
        if (isMobile) {
            toggleAboutModal();
        } else {
            navigate("/about");
        }
    };

    return (
        <nav ref={navbarRef} className={`sticky top-0 z-50 ${isDarkMode ? "bg-[#141729]" : "bg-[#292E50]"}`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2">
                <div className="relative flex h-22 sm:h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <img
                                className="h-20 w-auto sm:h-24"
                                src="/Assets/PE_BLANCO.png"
                                alt="Modelos 3D"
                            />
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center">
                        <Link
                            to="/"
                            className="mx-4 font-semibold text-lg sm:text-xl text-white hover:text-indigo-200 transition"
                        >
                            Inicio
                        </Link>
                        <Link
                            to="/library"
                            className="mx-4 font-semibold text-lg sm:text-xl text-white hover:text-indigo-200 transition"
                        >
                            Biblioteca
                        </Link>
                        <button
                            onClick={handleAboutClick}
                            className="mx-4 font-semibold text-lg sm:text-xl text-white hover:text-indigo-200 transition"
                        >
                            Acerca de BiMo
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    {isMobile && (
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded text-white hover:bg-indigo-700"
                        >
                            {isMenuOpen ? "✖" : "☰"}
                        </button>
                    )}

                    {/* Theme Toggles */}
                    <div className="hidden md:flex items-center space-x-2">
                        <button
                            onClick={toggleAutoTheme}
                            className={`px-3 py-1 rounded-md text-xs ${
                                isAutoTheme
                                    ? "bg-indigo-600 text-white"
                                    : "bg-gray-700 text-gray-300"
                            }`}
                        >
                            <span className="mr-1 font-semibold text-lg">
                                {isAutoTheme ? "Auto" : "Manual"}
                            </span>
                            <span className="text-lg">
                                {isAutoTheme ? "🌓" : "⚙️"}
                            </span>
                        </button>
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
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && isMobile && (
                <div className={`md:hidden bg-[#292E50] ${isDarkMode ? "bg-[#141729]" : "bg-[#292E50]"}`}>
                    <Link
                        to="/library"
                        className="block px-4 py-2 text-white hover:bg-indigo-700"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Biblioteca
                    </Link>
                    <button
                        onClick={() => {
                            handleAboutClick();
                            setIsMenuOpen(false);
                        }}
                        className="block px-4 py-2 text-white hover:bg-indigo-700"
                    >
                        Acerca de BiMo
                    </button>
                </div>
            )}

            {/* About Modal */}
            {isAboutOpen && isMobile && (
                <div className="fixed inset-0 z-50 flex items-start justify-start pt-24 sm:pt-32">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleAboutModal}></div>
                    <div
                        className={`relative max-w-lg w-full mx-4 p-6 rounded-lg shadow-lg ${
                            isDarkMode ? "bg-[#1a1f3c]" : "bg-white"
                        }`}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={toggleAboutModal}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <h2
                            className={`text-2xl font-bold mb-4 ${
                                isDarkMode ? "text-white" : "text-gray-800"
                            }`}
                        >
                            Acerca de BiMo
                        </h2>
                        <div className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                            <p className="mb-4">
                                BiMo (Biblioteca de Monumentos) es un proyecto desarrollado para la Universidad La Salle Oaxaca que permite visualizar y explorar modelos 3D de monumentos históricos y culturales.
                            </p>
                            <p className="mb-4">
                                Esta plataforma busca preservar y difundir el patrimonio cultural a través de representaciones digitales precisas, facilitando el acceso al conocimiento histórico y arquitectónico.
                            </p>
                            <p>Versión 5.9.1 - Desplegado en Firebase y desarrollado con tecnologías web modernas como React | Vite, Three.js y TailwindCSS.</p>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
