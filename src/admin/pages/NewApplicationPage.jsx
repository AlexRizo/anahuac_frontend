import { useAppStore } from "@/hooks";
import { ApplicationConfirm, ApplicationForm } from "../views";

export const NewApplicationPage = () => {
    const { ok } = useAppStore();
    
    return (
        <main className="w-full relative">
            <div>
                <nav className="flex items-center gap-5 px-14 py-8">
                    <h1 className="text-3xl font-semibold">Aplicaciones</h1>
                    <p className="text-gray-400 pt-1"> / Crear nueva</p>
                </nav>
                <hr />
            </div>
            <div className="px-14 py-6 w-full h-[calc(100%-101px)] flex items-center justify-center animate__animated animate__zoomIn">
                {
                    ok ? (
                        <ApplicationConfirm/>
                    ) : (
                        <ApplicationForm/>
                    )
                }
            </div>
        </main>
    )
}
