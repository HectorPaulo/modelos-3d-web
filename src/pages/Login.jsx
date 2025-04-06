import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate(); // Reemplaza useRouter con useNavigate

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

        // Aquí puedes agregar lógica de autenticación
        console.log("Email:", email, "Password:", password);

        // Navegar a la página principal después de iniciar sesión
        navigate("/");
    };

    return (
        <div style={{
            backgroundImage: "url('/src/assets/fondo2.jpg')",
            backgroundSize: "cover",
            
        }} ref={containerRef} className="flex h-screen bg- flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="animate-bounce mx-auto h-10 w-auto" src="/src/assets/vite.png" alt="Your Company" />
                <h2 className="mt-10 text-center text-6xl font-bold tracking-tight text-gray-100">
                    Inicia sesión en tu cuenta
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-100">
                            Correo electrónico
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-semibold text-gray-100">
                                Contraseña
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-bold text-white hover:text-indigo-500">
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
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="mt-5 border-2 px-5 py-2 rounded-lg border-white border-b-4 font-black translate-y-2 border-l-4 cursor-pointer hover:scale-105 text-white hover:animate-pulse"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-100">
                    ¿Aún no tienes cuenta?
                    <a href="#" className="ml-2 font-semibold text-green-400 hover:text-indigo-500">
                         Qué lástima
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;