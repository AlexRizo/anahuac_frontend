import { Anahuac } from "@/auth/components"
import { Button, Label, Progress } from "@/components/ui"
import { useExamStore } from "@/hooks";
import { ArrowLeft, ArrowRight, CheckSquare, LoaderCircle, Save } from "lucide-react"
import { useEffect, useMemo, useState } from "react";
import { Answers, Article, BlockProgress, LoadingQuestionPage } from "../components";

export const LecturaPage = () => {
    const {
        questions,
        activeQuestion,
        total,
        isLoading,
        specials,
        startLoadingAllBlockQuestions,
        startLoadingActiveQuestion,
        startSaveLocalAnswer,
        answeredQuestions,
        startLoadingLocaleExam,
    } = useExamStore();

    const isLoadingData = useMemo(() => isLoading === 'loading', [isLoading]);

    const [index, setIndex] = useState(0);
    const [totalComplete, setTotalComplete] = useState(0);
    const [currentArticle, setCurrentArticle] = useState({});

    const articleQuestionId = useMemo(() => activeQuestion?.relation, [activeQuestion]);

    // Cargar todas las preguntas solo al montar el componente
    useEffect(() => {
        startLoadingAllBlockQuestions();
        startLoadingLocaleExam();
    }, []);

    // Establecer activeQuestion cuando las preguntas o el índice cambien
    useEffect(() => {
        if (questions.length > 0) {
            startLoadingActiveQuestion(questions[index]);
        }
    }, [questions, index]);

    // Establecer el artículo actual basado en articleQuestionId
    useEffect(() => {
        if (!activeQuestion || !specials.length ) return;

        const article = specials.find(article => article.id === articleQuestionId);
        
        if (article.id !== currentArticle.id) {
            setCurrentArticle(article);
            console.log({ article });
        }
    }, [activeQuestion, specials]);

    const [response, setResponse] = useState(null);

    useEffect(() => {
        if (!activeQuestion) return;

        // Encuentra la respuesta guardada solo si `activeQuestion` ha cambiado.
        const savedResponse = answeredQuestions.find(answer => answer.id === activeQuestion?.id)?.response || null;
    
        // Verificar que `response` realmente cambió antes de actualizar el estado.
        if (savedResponse !== response) {
            setResponse(savedResponse);
        }
    }, [activeQuestion, answeredQuestions]);

    useEffect(() => {
        if (!activeQuestion) return;

        const savedResponse = answeredQuestions.find(answer => answer.id === activeQuestion?.id)?.response || null;
        setResponse(savedResponse);
        setTotalComplete(answeredQuestions.length);
    }, [activeQuestion, answeredQuestions]);
    
    const handlePrev = () => {
        if (index > 0) {
            setResponse(null);
            setIndex(index - 1);
        }
    };

    const handleNext = () => {
        if (index < questions.length - 1) {
            setResponse(null);
            setIndex(index + 1);
        }

        if (response) {
            startSaveLocalAnswer({ id: activeQuestion.id, response });
        }
    };

    if (isLoadingData) {
        return <LoadingQuestionPage />;
    }

    return (
        <main className="w-full grid min-h-dvh grid-rows-[auto_1fr_auto] py-5">
            <div className="flex">
                <div className="w-1/2 px-24 h-full flex flex-col">
                    <div className="mb-12">
                        <p className="text-sm font-semibold">Bloque:</p>
                        <h1 className="text-3xl font-bold">Comprensión lectora y escritura</h1>
                    </div>
                    <div className="max-h-[550px] overflow-y-scroll custom-scrollbar pr-5">
                        {
                            currentArticle ? 
                                <Article
                                    title={ currentArticle.title }
                                    author={ currentArticle.author }
                                    text={ currentArticle.content }
                                    contentOrigin={ currentArticle.contentOrigin }
                                />
                            :
                                (
                                    <div>
                                        <LoaderCircle size={32} strokeWidth={1.50} className="animate-spin" />
                                        <p className="">Cargando artículo...</p>
                                    </div>
                                )
                        }
                    </div>
                </div>
                <div className="w-1/2 px-24 flex flex-col">
                    <div className="flex items-center justify-end gap-3">
                        <BlockProgress total={ total } done={ totalComplete } />
                        <Button className="bg-blue-600 hover:bg-blue-700 gap-1">
                            Guardar
                            <Save strokeWidth={1.50} />
                        </Button>
                        <Button className="bg-green-700 hover:bg-green-800 gap-1">
                            Terminar bloque
                            <CheckSquare strokeWidth={1.50} />
                        </Button>
                    </div>
                    <div className="mt-36">
                        <p className="text-lg font-medium mb-4">
                            { activeQuestion.question }
                        </p>
                        <div>
                            <Answers answers={ activeQuestion.answers } value={ response } onChange={ setResponse } />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center px-24 gap-28 mt-auto mb-20">
                <div className="my-auto flex gap-4 items-center w-1/2">
                    <Label>Lecturas:</Label>
                    <Progress value={33} indicatorColor="bg-emerald-500" className="border border-emerald-500" />
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
