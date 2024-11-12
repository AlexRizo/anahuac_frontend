import { ArrowLeft, ArrowRight, CheckSquare, Save } from "lucide-react"
import { ActualProgress, BlockProgress, CustomAlertDialog, LoadingQuestionPage, MathematicAnswers } from "../components"
import { Button, Label } from "@/components/ui"
import { Anahuac } from "@/auth/components"
import { useExamStore } from "@/hooks"
import { useEffect, useMemo, useState } from "react"

export const MatematicasPage = () => {
    const {
      activeQuestion,
      answeredQuestions,
      questions,
      total,
      totalResponded,
      isLoading,
      startLoadingActiveQuestion,
      startSavingExam,
      startSavingExamAndNextLevel,
      startSaveLocalAnswer,
      startLoadingAllBlockQuestions,
      startLoadingLocaleExam,
      startResetExam,
    } = useExamStore();

    const [index, setIndex] = useState(0);
    const [response, setResponse] = useState([]);
    const [totalComplete, setTotalComplete] = useState(0);
    const [recentSaved, setRecentSaved] = useState(false);

    const isLoadingData = useMemo(() => isLoading === 'loading', [isLoading]);
    
    useEffect(() => {
        startLoadingAllBlockQuestions('matematicas');
        startLoadingLocaleExam();
    }, []);

    useEffect(() => {
        if (questions.length > 0) {
            startLoadingActiveQuestion(questions[index]);
        }
    }, [questions, index]);

    useEffect(() => {
        if (!activeQuestion) return;

        const savedResponse = answeredQuestions.find(answer => answer.id === activeQuestion.id)?.response || [];

        if (savedResponse.length) {
            setResponse(savedResponse);
        } else {
            setResponse([]);
        }
        
        setTotalComplete(answeredQuestions.length);
    }, [activeQuestion, answeredQuestions]);
    
    useEffect(() => {
        if (!activeQuestion) return;
        
        const isDifferent = answeredQuestions.find(answer => answer.id === activeQuestion.id)?.response !== response;
        
        if (isDifferent && response.length) {
            startSaveLocalAnswer({ id: activeQuestion.id, response });
        }
    }, [response]);

    const handleNext = () => {
        if (index < questions.length - 1) {
            setIndex(index + 1);
        }
    }

    const handlePrev = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    }

    const handleSave = () => {
        setRecentSaved(true);
        startSavingExam('matematicas');

        setTimeout(() => {
            setRecentSaved(false);
        }, 15000);
    }

    if (isLoadingData) {
        return <LoadingQuestionPage />;
    }

    return (
        <main className="w-full grid min-h-dvh grid-rows-[auto_1fr_auto] py-5">
            <div className="flex">
                <div className="w-1/2 px-24 h-full flex flex-col">
                    <div className="mb-12">
                        <p className="text-sm font-semibold">Bloque:</p>
                        <h1 className="text-3xl font-bold">Habilidades Lógico - Matemáticas</h1>
                    </div>
                    <div className="pr-5 h-[550px] flex items-center justify-center">
                        <img src={`${ activeQuestion.attachment }`} className="w-[540px]" alt={ activeQuestion.attachment } />
                    </div>
                </div>
                <div className="w-1/2 px-24 flex flex-col">
                    <div className="flex items-center justify-end gap-4">
                        <BlockProgress total={ total } done={ totalComplete } />
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 gap-1"
                            onClick={ handleSave }
                            disabled={ recentSaved }
                        >
                            Guardar
                            <Save strokeWidth={1.50} />
                        </Button>

                        <CustomAlertDialog 
                            title="Confirmar finalización del bloque" 
                            content={<>
                                Antes de finalizar, asegúrate de haber respondido todas las preguntas. <br /><br />
                                ¿Estás seguro de que deseas finalizar este bloque?. Tu progreso se guardará y no podrás regresar.
                            </>}
                            // onConfirm={ startSavingExamAndNextLevel }
                        >
                            <Button 
                                className={`bg-green-700 hover:bg-green-800 gap-1 ${ totalResponded === questions.length && 'animated-border-button' }`}

                            >
                                Terminar bloque
                                <CheckSquare strokeWidth={1.50} />
                            </Button>
                        </CustomAlertDialog>
                    </div>
                    <div className="mt-36">
                        <p className="text-lg font-medium mb-4">
                            { activeQuestion.question }
                        </p>
                        <div>
                            <MathematicAnswers answers={ activeQuestion.answers } value={ response } onChange={ setResponse } type={ activeQuestion.type } /> 
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center px-24 gap-28 mt-auto mb-20">
                <div className="my-auto flex gap-4 items-center w-1/2">
                    <ActualProgress actual={ index + 1 } total={ questions.length } />
                </div>
                <div className="flex items-center justify-center gap-4 my-auto w-1/2">
                    <Button 
                        variant="ghost" 
                        className="bg-gray-100 hover:bg-slate-50 gap-1"
                        onClick={ handlePrev }
                        disabled={ index === 0 }
                    >
                        <ArrowLeft strokeWidth={1.5} />
                        Anterior
                    </Button>
                    <Label>Reactivos de Lectura</Label>
                    <Button 
                        variant="ghost" 
                        className="bg-gray-100 hover:bg-slate-50 gap-1"
                        onClick={ handleNext }
                        disabled={ index === questions.length - 1 }
                    >
                        Siguiente
                        <ArrowRight strokeWidth={1.5} />
                    </Button>
                </div>
            </div>
            <div className="flex justify-between items-end px-8">
                <Anahuac fill="#2B3844" />
                <p className="text-gray-500">© 2025 Colegio Anáhuac Colima. Todos los derechos Reservados.</p>
            </div>
        </main>
    )
}
