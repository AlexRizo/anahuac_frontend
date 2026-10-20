import { Anahuac } from "@/auth/components";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button, Label, RadioGroup, RadioGroupItem } from "@/components/ui"
import { useAspirantProfile, useToast } from "@/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GRADES = ["1", "2", "3"];

export const HomePage = () => {
    const [active, setActive] = useState(false);

    const [count, setCount] = useState(10);

    const [grade, setGrade] = useState("");
    const [isStarting, setIsStarting] = useState(false);

    const navigate = useNavigate();
    const { toast } = useToast();
    const { profile, isLoading: isLoadingProfile, error: profileError, saveGrade } = useAspirantProfile();

    // ? Solo los aspirantes de secundaria indican a qué grado solicitan ingreso
    const needsGrade = profile?.app_origin === "SECUNDARIA";
    const isGradeLocked = !!profile?.grade_locked;
    const canStart = active && !isLoadingProfile && !profileError && (!needsGrade || !!grade);

    useEffect(() => {
        if (count === 0) {
            setActive(true);
            return;
        };

        const interval = setInterval(() => {
            setCount(count - 1);
        }, 10);

        return () => clearInterval(interval);
    }, [count]);

    // ? Si ya había elegido grado (recargó la página o volvió), se muestra seleccionado
    useEffect(() => {
        if (profile?.grade) setGrade(String(profile.grade));
    }, [profile?.grade]);

    const handleStart = async () => {
        if (needsGrade && !isGradeLocked && String(profile?.grade ?? "") !== grade) {
            setIsStarting(true);

            try {
                await saveGrade(Number(grade));
            } catch (error) {
                console.error(error);
                setIsStarting(false);
                return toast({
                    title: "No se pudo guardar tu grado",
                    description: error?.response?.data?.message || "Inténtalo de nuevo o avisa a tu aplicador.",
                    variant: "destructive",
                });
            }
        }

        navigate("/examen/exap");
    };
    
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
                        <h1 className="text-2xl font-medium text-primary">Bienvenido/a al Examen de Admisión del Colegio Anáhuac</h1>
                        <p className="text-gray-600 test-base">
                            Atiende las indicaciones de tu docente. 
                            Él te indicará cuando puedes empezar.
                        </p>
                    </div>
                    {
                        needsGrade && (
                            <div className="mb-6" data-testid="grade-selector">
                                <Label className="text-base font-medium text-primary">
                                    ¿A qué grado de secundaria solicitas ingreso?
                                </Label>
                                <RadioGroup
                                    value={ grade }
                                    onValueChange={ setGrade }
                                    disabled={ isGradeLocked }
                                    className="flex gap-4 mt-3"
                                >
                                    {
                                        GRADES.map((value) => (
                                            <div
                                                key={ value }
                                                className={`flex items-center gap-3 border rounded-xl px-5 py-3 transition ${ grade === value ? "bg-teal-200/60 border-teal-400" : "border-gray-200" }`}
                                            >
                                                <RadioGroupItem value={ value } id={ `grade-${ value }` } />
                                                <Label htmlFor={ `grade-${ value }` } className="text-lg cursor-pointer">
                                                    { value }°
                                                </Label>
                                            </div>
                                        ))
                                    }
                                </RadioGroup>
                                {
                                    isGradeLocked ? (
                                        <p className="text-sm text-gray-500 mt-2">Tu grado ya quedó registrado.</p>
                                    ) : !grade && (
                                        <p className="text-sm text-gray-500 mt-2">Selecciona tu grado para poder iniciar el examen.</p>
                                    )
                                }
                            </div>
                        )
                    }
                    {
                        profileError && (
                            <p className="text-sm text-red-500 mb-4">
                                No pudimos cargar tus datos. Recarga la página o avisa a tu aplicador.
                            </p>
                        )
                    }
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                disabled={ !canStart || isStarting }
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
                                    {
                                        needsGrade && grade && (
                                            <>
                                                <br />
                                                <br />
                                                Solicitas ingreso a <strong>{ grade }° de secundaria</strong>.
                                            </>
                                        )
                                    }
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={ handleStart }
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
