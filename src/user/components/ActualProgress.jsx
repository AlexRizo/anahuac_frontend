import { Label, Progress } from "@/components/ui"
import { useEffect, useState } from "react"
import { useExamStore } from "@/hooks"

export const ActualProgress = ({ block }) => {

    const { specials } = useExamStore();
    const [progress, setProgress] = useState(0);

    // ? Avance por artículo (en el orden de los artículos): 1/3 de la barra para el primero, etc.
    const steps = [0.5, 1.7, 3];

    useEffect(() => {
        const articleIndex = [...specials]
            .sort((a, b) => a.number - b.number)
            .findIndex((article) => article.id === block);

        if (articleIndex >= 0 && steps[articleIndex] !== undefined) {
            setProgress((steps[articleIndex] * 100) / 3);
        }
    }, [block, specials]);

    return (
        <>
            <Label>Lecturas:</Label>
            <div className="w-full relative">
                <div className="w-full flex justify-between absolute z-10 -bottom-4 pl-20">
                    <span className='py-3 px-5 bg-emerald-600 text-white rounded-full'>1</span>
                    <span className='py-3 px-5 bg-emerald-600 text-white rounded-full'>2</span>
                    <span className='py-3 px-5 bg-emerald-600 text-white rounded-full'>3</span>
                </div>
                <Progress value={ progress } indicatorColor="bg-emerald-500" className="border border-emerald-500" />
            </div>      
        </>
    )
}
