import { Label, Progress } from "@/components/ui"
import { useEffect, useMemo, useState } from "react"

export const ActualProgress = ({ actual, index }) => {
    const [progress, setProgress] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(1);

    const $index = useMemo(() => index, [index]);

    const blocks = [
        { id: '672279a3a3f880dfc5b70a8a', bloque: 1, total: 10 },
        { id: '67228afb1d0fcdd16996d872', bloque: 2, total: 6 },
        { id: '6722937322a8c5bd203084a4', bloque: 3, total: 4 },
    ]

    // useEffect(() => {
    //     const block = blocks.find(block => block.id === actual);
    //     const total = block.total;
    //     const progress = currentIndex / total * 100;
    //     setProgress(progress);

    //     if ($index)
    // }, [actual, index]);
    
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
