import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

const Login = ({ isDarkMode }) => {
    const containerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
        );
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        console.log("Email:", email, "Password:", password);

        navigate("/");
    };

    return (
        <div
            style={{
                backgroundImage: isDarkMode
                    ? "url('/src/assets/fondo2.jpg')"
                    : "url('/src/assets/fondo2.jpg')",
                backgroundSize: "cover",
            }}
            ref={containerRef}
            className="min-h-screen flex items-center justify-center"
        >
            <div
                className={`backdrop-blur-2xl w-screen h-screen ${
                    isDarkMode ? "bg-black/50" : "bg-white/"
                }`}
            >
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="animate-bounce my-auto mx-auto h-10 w-auto"
                        src="/src/assets/vite.png"
                        alt="Your Company"
                    />
                    <h2
                        className={`mt-10 text-center text-6xl font-bold tracking-tight ${
                            isDarkMode ? "text-gray-100" : "text-gray-900"
                        }`}
                    >
                        Inicia sesión en tu cuenta
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-6"
                        action="#"
                        method="POST"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className={`block text-sm font-semibold ${
                                    isDarkMode ? "text-gray-100" : "text-gray-900"
                                }`}
                            >
                                Correo electrónico
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    required
                                    className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 ${
                                        isDarkMode
                                            ? "bg-gray-800 text-gray-100 outline-gray-600 focus:outline-indigo-500"
                                            : "bg-white text-gray-900 outline-gray-300 focus:outline-indigo-600"
                                    }`}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className={`block text-sm font-semibold ${
                                        isDarkMode ? "text-gray-100" : "text-gray-900"
                                    }`}
                                >
                                    Contraseña
                                </label>
                                <div className="text-sm">
                                    <a
                                        href="#"
                                        className={`font-bold ${
                                            isDarkMode
                                                ? "text-white hover:text-indigo-500"
                                                : "text-gray-900 hover:text-indigo-500"
                                        }`}
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    autoComplete="current-password"
                                    required
                                    className={`block w-full rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 ${
                                        isDarkMode
                                            ? "bg-gray-800 text-gray-100 outline-gray-600 focus:outline-indigo-500"
                                            : "bg-white text-gray-900 outline-gray-300 focus:outline-indigo-600"
                                    }`}
                                />
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className={`mt-5 border-2 px-5 py-2 rounded-lg font-black translate-y-2 cursor-pointer hover:scale-105 ${
                                    isDarkMode
                                        ? "border-gray-100 text-gray-100 hover:animate-pulse"
                                        : "border-gray-900 text-gray-900 hover:animate-pulse"
                                }`}
                            >
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>

                    <p
                        className={`mt-10 text-center text-sm ${
                            isDarkMode ? "text-gray-100" : "text-gray-900"
                        }`}
                    >
                        ¿Aún no tienes cuenta?
                        <a
                            href="#"
                            className={`ml-2 font-semibold ${
                                isDarkMode
                                    ? "text-green-400 hover:text-indigo-500"
                                    : "text-green-600 hover:text-indigo-500"
                            }`}
                        >
                            Qué lástima
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;