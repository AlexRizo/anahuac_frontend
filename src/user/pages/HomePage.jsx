import { Button } from "@/components/ui"
import { useEffect, useState } from "react";

export const HomePage = () => {
    const [active, setActive] = useState(false);

    const [count, setCount] = useState(15);

    useEffect(() => {
        if (count === 0) {
            setActive(true);
            return;
        };

        const interval = setInterval(() => {
            setCount(count - 1);
        }, 1050);

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
                <Button
                    disabled={!active}
                    className="w-52 mt-10"
                >
                    {
                        active ? "Iniciar examen" : `Podrás comenzar en ${count}`
                    }
                </Button>
            </div>
        </main>
    )
}
