import { Label, Progress } from "@/components/ui"
import { useEffect, useState } from "react"

export const ActualProgress = ({ actual, block }) => {

    const [progress, setProgress] = useState(0);
    
    const blocks = [
        { block: 1, id: '672279a3a3f880dfc5b70a8a' },
        { block: 2, id: '67228afb1d0fcdd16996d872' },
        { block: 3, id: '6722937322a8c5bd203084a4' },
    ];
    
    useEffect(() => {
        if (block === blocks[0].id) return setProgress((0.5* 100) / 3);
        if (block === blocks[1].id) return setProgress((1.7 * 100) / 3);
        if (block === blocks[2].id) return setProgress((3 * 100) / 3);
    }, [block]);

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
