import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navbarRef = useRef(null);
    const isLogged = true;

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    useEffect(() => {
        // Animación de entrada del Navbar
        gsap.fromTo(
            navbarRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
        );
    }, []);

    useEffect(() => {
        if (isDropdownOpen) {
            gsap.fromTo(
                dropdownRef.current,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.3, ease: "power1.out" }
            );
        } else {
            gsap.to(dropdownRef.current, {
                opacity: 0,
                scale: 0.95,
                duration: 0.2,
                ease: "power1.in",
            });
        }
    }, [isDropdownOpen]);

    return (
        <nav ref={navbarRef} className={!isLogged ? "hidden" : "bg-gray-800"}>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="block size-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                                data-slot="icon"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                            <svg
                                className="hidden size-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                                data-slot="icon"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex shrink-0 items-center">
                        <Link to="/">
                            <img
                                className="h-8 w-auto"
                                src="/src/assets/vite.png"
                                alt="Modelos"
                                />
                        </Link>
                    </div>
                                {isLogged && (
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <Link
                                    to="/"
                                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:scale-105 transition-transform"
                                    aria-current="page"
                                    >
                                    Inicio
                                </Link>
                                {/* <Link
                                    to="/Profile"
                                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-transform"
                                    >
                                    Perfil
                                </Link> */}
                                {!isLogged && (
                                    <Link
                                    to="/Login"
                                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-transform"
                                    >
                                        Login
                                    </Link>
                        )}
                            </div>
                        </div>
                    )}
                    </div>
                    {isLogged && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="relative ml-3">
                            <div>
                                <button
                                    type="button"
                                    className="cursor-pointer hover:scale-105 relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                                    id="user-menu-button"
                                    aria-expanded={isDropdownOpen}
                                    aria-haspopup="true"
                                    onClick={toggleDropdown}
                                    >
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">Abrir menú del usuario</span>
                                    <img
                                        className="size-8 rounded-full"
                                        src="/src/assets/mcat.jpeg"
                                        alt="Profile image"
                                        />
                                </button>
                            </div>
                            <div
                                ref={dropdownRef}
                                className={`absolute right-0 z-[9999] mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 ${
                                    isDropdownOpen ? "block" : "hidden"
                                }`}
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="user-menu-button"
                            >
                                <Link
                                    to="Profile"
                                    className="block px-4 py-2 text-sm text-gray-700"
                                    role="menuitem"
                                    id="user-menu-item-0"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Perfil
                                </Link>
                                <Link
                                    to="Settings"
                                    className="block px-4 py-2 text-sm text-gray-700"
                                    role="menuitem"
                                    id="user-menu-item-1"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Configuración
                                </Link>
                                <Link
                                    to="Login"
                                    className="block px-4 py-2 text-sm text-red-700 font-semibold"
                                    role="menuitem"
                                    id="user-menu-item-2"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Cerrar sesión
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    )}
                </div>
                    </div>
                    <div className="sm:hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pt-2 pb-3">
                    <a
                        href="#"
                        className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white hover:scale-105 transition-transform"
                        aria-current="page"
                        >
                        Inicio
                    </a>
                    <a
                        href="#"
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-transform"
                        >
                        Acerca de
                    </a>
                    <a
                        href="#"
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-transform"
                        >
                        Modelos
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
