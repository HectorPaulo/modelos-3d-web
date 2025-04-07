import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Profile = ({ isDarkMode }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
        );
    }, []);

    return (
        <div
            ref={containerRef}
            className={`w-screen h-screen mx-auto ${
                isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
            }`}
        >
            <div className="flex justify-between container mx-auto">
                <div className="w-full flex justify-center">
                    <div className="w-1/2 mt-4 px-4">
                        <div className="relative z-[-10]">
                            <div className="mx-auto flex justify-center px-4 py-6 sm:px-6 lg:px-8">
                                <h1
                                    className={`text-7xl font-black tracking-widest ${
                                        isDarkMode ? "text-gray-100" : "text-gray-900"
                                    }`}
                                >
                                    PERFIL
                                </h1>
                            </div>
                        </div>
                        <div
                            className={`bg-gradient-to-r h-[1px] w-2/3 mx-auto ${
                                isDarkMode
                                    ? "from-gray-800 via-gray-600 to-gray-800"
                                    : "from-gray-200 via-gray-900 to-gray-200"
                            }`}
                        ></div>
                        <form className="mx-5 my-5 justify-center flex flex-col">
                            <label
                                className={`relative block p-3 border-2 rounded ${
                                    isDarkMode
                                        ? "border-gray-600 text-gray-100"
                                        : "border-gray-300 text-gray-900"
                                }`}
                                htmlFor="email"
                            >
                                <span className="text-md font-semibold">
                                    Correo electrónico
                                </span>
                                <input
                                    className={`w-full bg-transparent p-0 text-sm focus:outline-none ${
                                        isDarkMode
                                            ? "text-gray-100 placeholder-gray-400"
                                            : "text-gray-900 placeholder-gray-500"
                                    }`}
                                    id="email"
                                    type="email"
                                    placeholder="Ej. juan@example.com"
                                />
                            </label>
                            <div className="mt-5">
                                <label
                                    className={`relative block p-3 border-2 rounded ${
                                        isDarkMode
                                            ? "border-gray-600 text-gray-100"
                                            : "border-gray-300 text-gray-900"
                                    }`}
                                    htmlFor="password"
                                >
                                    <span className="text-md font-semibold">
                                        Contraseña
                                    </span>
                                    <input
                                        id="password"
                                        type="password"
                                        className={`w-full pl-1 bg-transparent focus:outline-none ${
                                            isDarkMode
                                                ? "text-gray-100 placeholder-gray-400"
                                                : "text-gray-900 placeholder-gray-500"
                                        }`}
                                        placeholder="Contraseña segura"
                                    />
                                </label>
                            </div>
                            <div className="flex items-center mt-5">
                                <label className="block">
                                    <input
                                        type="file"
                                        className={`w-full text-sm file:mr-4 file:py-2 file:px-5 file:rounded-lg file:font-semibold ${
                                            isDarkMode
                                                ? "file:border-gray-600 file:bg-gray-800 file:text-gray-100"
                                                : "file:border-gray-300 file:bg-gray-200 file:text-gray-900"
                                        }`}
                                    />
                                </label>
                                <div className="shrink-0 ml-5">
                                    <img
                                        className="h-20 w-20 object-cover rounded-full"
                                        src="/src/assets/mcat.jpeg"
                                        alt="Foto de perfil"
                                    />
                                </div>
                            </div>
                            <button
                                className={`mt-5 border-2 px-5 py-2 rounded-lg cursor-pointer hover:scale-105 font-black translate-y-2 ${
                                    isDarkMode
                                        ? "border-gray-600 text-gray-100"
                                        : "border-gray-300 text-gray-900"
                                }`}
                            >
                                Aceptar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;