import { Anahuac } from "@/auth/components";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button } from "@/components/ui"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const [active, setActive] = useState(false);

    const [count, setCount] = useState(20);

    const navigate = useNavigate();

    useEffect(() => {
        if (count === 0) {
            setActive(true);
            return;
        };

        const interval = setInterval(() => {
            setCount(count - 1);
        }, 1500);

        return () => clearInterval(interval);
    }, [count]);
    
    return (
        <section className="h-screen w-screen flex justify-end items-center bg-orange-50 animate__animated animate__fadeIn overflow-hidden relative">
            <div className={`absolute pt-16 pb-10 px-28 bg-[url('/img/login_user/login-user.jpg')] bg-cover bg-center h-full left-0 w-[55%]`}>
                <div className="absolute top-0 left-0 h-full w-full  bg-gradient-to-br from-[#FF9D26B2] to-[#FF8706B2]"></div>
                <div className="absolute top-0 left-0 h-full w-full bg-[url('/img/login_user/login-user-bg.jpg')] opacity-20 bg-cover bg-center z-10"></div>
                <div className="flex flex-col justify-between h-full w-full relative z-20 text-white">
                    <div className="uppercase text-center drop-shadow-xl">
                        <h1 className="text-[40px]">La experiencia</h1>
                        <h2 className="font-black text-[70px]">Anáhuac</h2>
                    </div>
                    <div>
                        <h1 className="text-[70px] permanent-maker text-center drop-shadow-xl">Comienza hoy</h1>
                    </div>
                </div>
            </div>
            <div className="border shadow p-6 h-full bg-white flex w-[45%]">
                <div className="w-[493px] m-auto">
                    <div className="mb-6 flex flex-col gap-4">
                        <Anahuac fill="#2B3844" className="mb-8" />
                        <h1 className="text-2xl font-medium text-primary">Bienvenido/a al Examen de Admisión de Prepa Anáhuac</h1>
                        <p className="text-gray-600 test-base">
                            Atiende las indicaciones del tu docente. 
                            Él te indicará cuando puedes empezar.
                        </p>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                disabled={!active}
                                className="w-full mt-5"
                            >
                                {
                                    active ? "Iniciar examen" : `Podrás comenzar en ${ count }`
                                }
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Confirmación</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Estás a punto de comenzar el examen. ¿Estás seguro de que deseas continuar?.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => navigate("/examen/exap")}
                                >
                                    Iniciar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </section>
    )
}
