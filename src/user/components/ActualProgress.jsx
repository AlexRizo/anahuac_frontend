import { Label, Progress } from "@/components/ui"
import { useExamStore } from "@/hooks";
import { useEffect, useState } from "react"

export const ActualProgress = ({ actual, block }) => {
    const { questions } = useExamStore();

    const orders = ['123', '132', '213', '231', '312', '321'];
    const [progress, setProgress] = useState(0);
    const [styles, setStyles] = useState([]);
    
    const blocks = [
        { block: 1, id: '672279a3a3f880dfc5b70a8a' },
        { block: 2, id: '67228afb1d0fcdd16996d872' },
        { block: 3, id: '6722937322a8c5bd203084a4' },
    ];

    useEffect(() => {
        if (questions.length > 0) {
            const groupOrder = [];
            let currentGroup = [];

            questions.forEach((item, index) => {
                if (currentGroup.length === 0 || currentGroup[0] === item.relation) {
                    currentGroup.push(item.relation);
                } else {
                    groupOrder.push(currentGroup[0]); // Almacena el ID del bloque
                    currentGroup = [item.relation];  // Inicia un nuevo grupo
                }
            
                // Asegurar que el último grupo se almacene al final
                if (index === questions.length - 1) {
                    groupOrder.push(currentGroup[0]);
                }
            });
            
            // Mapeo a bloques para mejor legibilidad
            const blockOrder = groupOrder.map(id => {
                const block = blocks.find(block => block.id === id);
                return block ? block.block : null;
            });
            
            console.log("Orden de IDs:", groupOrder);
            console.log("Orden de bloques:", blockOrder);

            if (orders[0] === (blockOrder.join(''))) {
                setStyles(["left-1/2", "left-[70%]", "left-[80%]"]);
            }
        }

    }, [questions]);
    
    useEffect(() => {
        setProgress(((actual + 1) * 100) / 20);
    }, [actual]);

    return (
        <>
            <Label>Lecturas:</Label>
            <div className="w-full relative">
                <div className="w-full flex absolute z-10 -bottom-4 ">
                    <span className={`py-3 px-5 bg-emerald-600 text-white rounded-full absolute -bottom-0 ${ styles[0] }`}>1</span>
                    <span className={`py-3 px-5 bg-emerald-600 text-white rounded-full absolute -bottom-0 ${ styles[1] }`}>2</span>
                    <span className={`py-3 px-5 bg-emerald-600 text-white rounded-full absolute -bottom-0 ${ styles[2] }`}>3</span>
                </div>
                <Progress value={ progress } indicatorColor="bg-emerald-500" className="border border-emerald-500" />
            </div>      
        </>
    )
}
