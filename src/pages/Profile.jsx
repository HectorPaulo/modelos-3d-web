import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Profile = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
        );
    }, []);

    return (
        <div ref={containerRef} className="sm:mx-32 lg:mx-32 xl:mx-72">
            <div className="flex justify-between container mx-auto">
                <div className="w-full">
                    <div className="mt-4 px-4">
                    <div className="relative z-[-10]">
                <div className="mx-auto flex justify-center px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-7xl font-black tracking-widest text-gray-900">
                        PERFIL
                    </h1>
                </div>
            </div>
            <div className="bg-gradient-to-r from-gray-200 via-gray-900 to-gray-200 h-[1px] w-2/3 mx-auto"></div>
                        <form className="mx-5 my-5 justify-center flex flex-col">
                            <label className="relative block p-3 border-2 border-black rounded" htmlFor="email">
                                <span className="text-md font-semibold text-zinc-900">Correo electrónico</span>
                                <input
                                    className="w-full bg-transparent p-0 text-sm text-gray-500 focus:outline-none"
                                    id="email"
                                    type="email"
                                    placeholder="Ej. juan@example.com"
                                />
                            </label>
                            <div className="mt-5">
                                <label className="relative block p-3 border-2 border-black rounded" htmlFor="password">
                                    <span className="text-md font-semibold text-zinc-900">Contraseña</span>
                                    <input
                                        id="password"
                                        type="password"
                                        className="w-full pl-1 bg-transparent focus:outline-none"
                                        placeholder="Contraseña segura"
                                    />
                                </label>
                            </div>
                            <div className="flex items-center mt-5">
                                <label className="block">
                                    <input
                                        type="file"
                                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-5 file:rounded-lg file:font-semibold file:border-t-4 file:border-r-4 file:border-2 file:text-sm file:bg-gradient-to-r file:text-gray-800 cursor-pointer"
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
                            <button className="mt-5 border-2 px-5 py-2 rounded-lg border-black border-b-4 font-black translate-y-2 border-l-4">
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