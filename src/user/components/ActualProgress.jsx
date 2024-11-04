import { Label, Progress } from "@/components/ui"
import { useEffect, useState } from "react"

export const ActualProgress = ({ actual, total }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (total <= 0) return;

        if (actual <= 10) {
            setProgress(((actual - 1) / total) * 100);
        } else if (actual > 10 && actual <= 15) {
            setProgress(((actual - 1 + .5) / total) * 100);
        } else {
            setProgress((actual / total) * 100);
        }
    }, [actual, total])
    
    return (
        <>
            <Label>Lecturas:</Label>
            <div className="w-full relative">
                <div className="w-full flex justify-between absolute z-10 -bottom-4 pl-20 pr-24">
                    <span className="py-3 px-5 bg-emerald-600 text-white rounded-full">1</span>
                    <span className="py-3 px-5 bg-emerald-600 text-white rounded-full">2</span>
                    <span className="py-3 px-5 bg-emerald-600 text-white rounded-full">3</span>
                </div>
                <Progress value={ progress } indicatorColor="bg-emerald-500" className="border border-emerald-500" />
            </div>      
        </>
    )
}
