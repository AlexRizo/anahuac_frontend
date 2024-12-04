import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui"
import { evaluate } from "mathjs";

export const ResultsWithAnswersTable = ({ children, aspirant, aspirantResults, isLoading = true }) => {    
    const resolveMagicTriangle = (jsonString) => {
        const object = JSON.parse(jsonString);

        const { a1, a2, a3, b1, b2, b3, c1, c2, c3 } = Object.fromEntries(
            Object.entries(object).map(([key, value]) => [key, Number(value)])
        );
    
        let sumA, sumB, sumC;
        
        sumA = a1 + a2 + a3 + b1;
        sumB = b1 + b2 + b3 + c1;
        sumC = c1 + c2 + c3 + a1;
    
        return `${sumA}, ${sumB}, ${sumC}`; // ? A1 - B1 | B1 - C1 | C1 - A1
    };

    const resolveFourDigits = (array = ['']) => {
        array = [...array];

        if (array[array.length - 1] === '+') {
            array.pop();
        }

        const evaluation = evaluate(array.join(''));
        return evaluation;
    };
    
    return (
        <Sheet>
            <SheetTrigger>{ children }</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    { isLoading || !aspirant || !aspirantResults ? (
                        <>
                            <SheetTitle>Loading...</SheetTitle>
                            <SheetDescription></SheetDescription>
                        </>
                    ) : (
                        <>
                            <SheetTitle className="whitespace-pre-wrap break-words">
                                <span className="font-normal">Resultados obtenidos por</span><br/>
                                { aspirantResults.aspirant }
                            </SheetTitle>
                            <SheetDescription>
                                    <span className="grid grid-cols-2 mb-1">
                                        <span className="flex justify-evenly">
                                            <span>Reactivo</span>
                                            <span>Respuesta</span>
                                        </span>
                                        <span className="flex justify-evenly">
                                            <span>Reactivo</span>
                                            <span>Respuesta</span>
                                        </span>
                                    </span>
                                    <span className="max-h-[800px] overflow-y-auto grid grid-cols-2 custom-scrollbar">
                                        {
                                            aspirantResults.map((answer, index) => (
                                                <span key={ index } className="font-medium text-lg flex flex-row justify-evenly border">
                                                    <span ><span className="">{ answer.questionNumber }</span></span>
                                                    <span><span className="text-blue-600">
                                                        { 
                                                            answer.response.length === 2 ? answer.response.join(', ') 
                                                                : answer.response[0].length > 1 ? resolveMagicTriangle(answer.response[0])
                                                                : answer.response.length > 2 ? resolveFourDigits(answer.response)
                                                                : answer.response[0]
                                                        }
                                                    </span></span> 
                                                </span>
                                            )).sort((a, b) => a.questionNumber - b.questionNumber)
                                        }
                                    </span>
                            </SheetDescription>
                        </>
                    )}
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}
