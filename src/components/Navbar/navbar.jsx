import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

const Navbar = ({ isDarkMode, toggleTheme }) => {
    const navbarRef = useRef(null);

    useEffect(() => {
        // Animación de entrada del Navbar
        gsap.fromTo(
            navbarRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
        );
    }, []);

    return (
        <nav ref={navbarRef} className={`bg-[#141729] ${isDarkMode ? "dark:bg-[#141729]" : ""}`}>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-3">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <Link to="/">
                                <img
                                    className="h-15 w-auto"
                                    src="/src/assets/vite.png"
                                    alt="Modelos"
                                />
                            </Link>
                        </div>
                    </div>
                    {/* <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <Link to="/profile">
                                <img
                                    className="h-8 w-auto"
                                    src="/src/assets/account_circle.png"
                                    alt="profile"
                                />
                            </Link>
                        </div>
                    </div> */}
                    {/* <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 justify-center">
                        <input
                            type="checkbox"
                            id="react-option"
                            value=""
                            className="hidden peer"
                            onChange={toggleTheme}
                            checked={isDarkMode}
                        />
                        <label
                            htmlFor="react-option"
                            className="flex z-10 items-center peer relative justify-center w-12 h-12 shadow-lg duration-300 [box-shadow:1px_1px_0px_1px_#eab92d] border-2 border-yellow-200 peer-checked:border-2 peer-checked:border-gray-200 rounded-lg cursor-pointer text-neutral-50 peer-checked:[box-shadow:1px_1px_0px_1px_#075985] peer-checked:hover:[box-shadow:1px_1px_0px_1px_#1e1e1e] hover:[box-shadow:1px_1px_0px_1px_#1e1e1e]"
                        >
                        </label>
                        <svg
                            className="absolute stroke-white w-12 h-23 duration-300 peer-checked:opacity-100 opacity-0"
                            height="100"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 100 100"
                            width="100"
                            x="0"
                            xmlns="http://www.w3.org/2000/svg"
                            y="0"
                        >
                            <path
                                className="svg-stroke-primary"
                                d="M82.1,61.2a31.9,31.9,0,0,1-12.4,2.4A33.3,33.3,0,0,1,36.4,30.3a31.9,31.9,0,0,1,2.4-12.4A33.3,33.3,0,1,0,82.1,61.2Z"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="8"
                            ></path>
                        </svg>
                        <svg
                            className="absolute stroke-white w-12 h-23 duration-300 peer-checked:opacity-0 opacity-100"
                            height="100"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 100 100"
                            width="100"
                            x="0"
                            xmlns="http://www.w3.org/2000/svg"
                            y="0"
                        >
                            <path
                                className="svg-stroke-primary"
                                d="M50,18v3.6m0,56.8V82M82,50H78.4M21.6,50H18M72.6,72.6l-2.5-2.5M29.9,29.9l-2.5-2.5m45.2,0-2.5,2.5M29.9,70.1l-2.5,2.5M64.2,50A14.2,14.2,0,1,1,50,35.8,14.3,14.3,0,0,1,64.2,50Z"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="8"
                            ></path>
                        </svg>
                    </div> */}
                    <label class="relative inline-flex items-center cursor-pointer border-2 rounded-full border-gray-500">
                    <input onChange={toggleTheme}
                            checked={isDarkMode}
                            class="sr-only peer" 
                            value="" 
                            type="checkbox" />
                    <div
                        class="w-24 h-12 rounded-full ring-0 peer duration-500 outline-none before:bg-yellow-200 overflow-hidden before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center before:content-['☀️'] before:absolute before:h-10 before:w-10 before:top-1/2 before:rounded-full before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full peer-checked:shadow-lg after:content-['🌑'] after:absolute after:bg-[#1d1d1d] after:rounded-full after:top-[4px] after:right-1 after:translate-y-full after:w-10 after:h-10 after:opacity-0 after:transition-all after:duration-700 peer-checked:after:opacity-100 peer-checked:after:rotate-180 peer-checked:after:translate-y-0"
                    ></div>
                    </label>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
