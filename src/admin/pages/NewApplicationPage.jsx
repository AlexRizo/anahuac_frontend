import { useAppStore } from "@/hooks";
import { ApplicationConfirm, ApplicationForm } from "../views";
import { useEffect } from "react";
import { CustomAlert } from "../components";

export const NewApplicationPage = () => {
    const { activeApplication, cleanActiveApp } = useAppStore();
    
    useEffect(() => {
        cleanActiveApp();
    }, []);
    
    return (
        <main className="w-full relative">
            <div>
                <nav className="flex items-center gap-5 px-14 py-5 2xl:py-8">
                    <h1 className="text-2xl 2xl:text-3xl font-semibold">Aplicaciones</h1>
                    <p className="text-gray-400 pt-1"> / Crear nueva</p>
                </nav>
                <hr />
            </div>
            <div className="px-14 py-6 w-full h-[calc(100%-101px)] flex items-center justify-center animate__animated animate__zoomIn">
                {
                    !!activeApplication ? (
                        <div>
                            <CustomAlert
                                title="Nueva aplicación creada"
                                message={`Se ha creado una nueva fecha de examen de admisión exitosamente.`}
                                variant="success"
                            />
                            <ApplicationConfirm/>
                        </div>
                    ) : (
                        <ApplicationForm/>
                    )
                }
            </div>
        </main>
    )
}
