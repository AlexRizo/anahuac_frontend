import { useState } from "react";
import { useKeysStore, useUiStore } from "@/hooks";
import { Anahuac } from "../components"
import { CheckKey, Login, RegisterUser } from "../views";
import { Toaster } from "@/components/ui";

export const LoginUser = () => {
    const { systemStatus } = useUiStore();
    const { validateKeyStatus } = useKeysStore();
    const [ isRegister, setIsRegister ] = useState(false);

    return (
        <>
            <Toaster />

            <section className="h-screen w-screen flex justify-end items-center bg-orange-50 animate__animated animate__fadeIn overflow-hidden relative">
                <div className={`absolute pt-16 pb-10 px-28 bg-[url('/img/login_user/login-user.jpg')] bg-cover bg-center h-full left-0 ${ systemStatus ? "w-[55%]" : "w-[100%]" } transition-[width] duration-1000 ease-in-out`}>
                    <div className="absolute top-0 left-0 h-full w-full  bg-gradient-to-br from-[#FF9D26B2] to-[#FF8706B2]"></div>
                    <div className="absolute top-0 left-0 h-full w-full bg-[url('/img/login_user/login-user-bg.jpg')] opacity-20 bg-cover bg-center z-10"></div>
                    <div className="flex flex-col justify-between h-full w-full relative z-20 text-white">
                        <div className="uppercase text-center drop-shadow-xl">
                            <h1 className="text-4xl 2xl:text-[40px] mb-1">La experiencia</h1>
                            <h2 className="font-black text-6xl 2xl:text-[70px]">Anáhuac</h2>
                        </div>
                        <div>
                            <h1 className="text-6xl 2xl:text-[70px] permanent-maker text-center drop-shadow-xl">Comienza hoy</h1>
                        </div>
                    </div>
                </div>
                { systemStatus &&
                    <div className="border shadow p-1 2xl:p-6 h-full bg-white flex w-[45%]">
                        <div className="w-3/4 2xl:w-[493px] m-auto">
                            <div className="mb-4 2xl:mb-6 flex flex-col gap-2 2xl:gap-4">
                                <Anahuac fill="#2B3844" className="mb-3 2xl:mb-8" />
                                <h1 className="text-xl 2xl:text-2xl font-medium text-primary">Bienvenido/a al Examen de Admisión de Prepa Anáhuac</h1>
                                <h2 className="text-xs 2xl:text-sm text-slate-500">Atiende las instrucciones del aplicador, él te guiará para acceder a la prueba.</h2>
                            </div>
                            {
                                isRegister ? (
                                    <Login />
                                ) : (
                                    <>
                                        {
                                            validateKeyStatus === 'validated' ? <RegisterUser /> : <CheckKey />
                                        }
                                    </>
                                )

                            }
                            <p className="py-2 mt-4 text-slate-500 text-xs 2xl:text-sm text-center">
                                {
                                    isRegister ? "Si aún no te has registrado, hazlo con tu " : "Si ya realizaste el registro, ingresa con tu "
                                }
                                <span 
                                    className="underline text-orange-400 cursor-pointer"
                                    onClick={ ( () => setIsRegister(!isRegister) ) }>
                                        {
                                            isRegister ? "clave de admisión" : "usuario y contraseña"
                                        }
                                    </span>.
                            </p>
                        </div>
                    </div>
                }
            </section>
        </>
    )
}
