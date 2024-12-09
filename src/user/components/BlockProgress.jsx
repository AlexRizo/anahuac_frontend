import { Label, Progress } from "@/components/ui";
import { useEffect, useState } from "react";

export const BlockProgress = ({ total, done }) => {
    // Asegúrate de que total no sea cero para evitar la división por cero
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Recalcula el progreso cada vez que 'total' o 'done' cambien
        if (total > 0) {
            setProgress((done / total) * 100);
        }
    }, [total, done]);
    
    return (
        <div className="w-56">
            <Label>Progreso de bloque:</Label>
            <Progress value={ progress } indicatorColor={`${ progress < 80 && progress > 50 ? 'bg-green-500' : progress >= 80 ? 'bg-blue-600' : 'bg-yellow-400' }`} className={`border ${progress < 80 && progress > 50 ? 'border-green-500' : progress >= 80 ? 'border-blue-600' : 'border-yellow-400'} `} />
        </div>
    );
};