import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button } from "@/components/ui"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const [active, setActive] = useState(false);

    const [count, setCount] = useState(15);

    const navigate = useNavigate();

    useEffect(() => {
        if (count === 0) {
            setActive(true);
            return;
        };

        const interval = setInterval(() => {
            setCount(count - 1);
        }, 1);

        return () => clearInterval(interval);
    }, [count]);
    
    return (
        <main className="h-screen w-full flex flex-col items-center justify-center">
            <div className="w-96 text-center">
                <h1 className="text-2xl font-medium mb-3">Prepárate para iniciar el examen</h1>
                <p className="text-gray-600 test-base">
                    Porfavor, atiende las indicaciones del tu docente. 
                    Él te indicará cuando puedes empezar. Una vez que inicies, 
                    tendrás tiempo para terminar el examen.
                </p>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            disabled={!active}
                            className="w-52 mt-10"
                        >
                            {
                                active ? "Iniciar examen" : `Podrás comenzar en ${count}`
                            }
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Antes de continuar...</AlertDialogTitle>
                            <AlertDialogDescription>
                                Estás a punto de comenzar el examen. ¿Estás seguro de que deseas continuar?.
                                Una vez que inicies, tendrás 125 minutos para terminar.
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
        </main>
    )
}
