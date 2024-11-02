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
        <div className="w-1/3">
            <Label>Progreso de bloque:</Label>
            <Progress value={progress} indicatorColor="bg-blue-600" className="border border-blue-600" />
        </div>
    );
};