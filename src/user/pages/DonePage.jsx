import { Anahuac } from "@/auth/components"
import { useAuthStore } from "@/hooks";
import { useEffect } from "react"

export const DonePage = () => {
    const { startLogout } = useAuthStore();
    
    useEffect(() => {
        setTimeout(() => {
            startLogout();
        }, 60000 * 5)
    }, [])
    
    return (
        <main className="h-screen w-screen text-center flex flex-col justify-center items-center">
            <Anahuac fill='orange' />
            <h1 className="text-2xl font-semibold mt-5">¡Ya has terminado la prueba!</h1>
            <p>Pronto recibiras tus resultados.</p>
        </main>
    )
}
