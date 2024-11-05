import { onSetAnswerQuestion, onLoadQuestions, onLoadSpecial, onSetActiveQuestion, setIsLoading } from "@/store/exam/examSlice";
import { useDispatch, useSelector } from "react-redux";
import anahuacApi from "@/api/api";
import { useToast } from "./use-toast";

export const useExamStore = () => {
    const { questions, answeredQuestions, activeQuestion, total, totalResponded, isLoading, specials } = useSelector(state => state.exam);
    const { toast } = useToast();
    const dispatch = useDispatch();

    const startLoadingAllBlockQuestions = async () => {
        dispatch(setIsLoading('loading'));
        
        try {
            const { data } = await anahuacApi.get('/exam/lectura/questions');
            dispatch(onLoadQuestions(data.questions));
            await startLoadingSpecials();
            dispatch(setIsLoading('loaded'));
        } catch (error) {
            console.error(error);
            dispatch(setIsLoading('error'));
        }
    };

    const startLoadingSpecials = async () => {
        try{
            const { data } = await anahuacApi.get('/exam/getarticles');
            dispatch(onLoadSpecial(data.articles));
        } catch (error) {
            console.error(error);
            dispatch(setIsLoading('error'));
        }
    };

    const startLoadingActiveQuestion = (question) => {
        dispatch(onSetActiveQuestion(question));
    };

    const startLoadingLocaleExam = () => {
        const localExam = JSON.parse(localStorage.getItem('exam') || '[]');
        dispatch(onSetAnswerQuestion(localExam));
    };

    const startSaveLocalAnswer = (question) => {
        const { id, response } = question;

        // Obtener las respuestas guardadas en localStorage
        let localExam;
        try {
            localExam = JSON.parse(localStorage.getItem('exam') || '[]');
        } catch (error) {
            console.error("Error parsing localStorage exam:", error);
            localExam = []; // Fallback a un array vacío si hay un error
        }
    
        // Verificar si localExam es un array
        if (!Array.isArray(localExam)) {
            console.warn("localExam no es un array. Reinicializando a un array vacío.");
            localExam = []; // Reinicializa si no es un array
        }
    
        // Filtrar la respuesta existente
        const updatedExam = localExam.filter(item => item.id !== id);
        updatedExam.push({ id, response }); // Agregar la nueva respuesta
    
        dispatch(onSetAnswerQuestion(updatedExam));

        // Guardar el array actualizado en localStorage
        localStorage.setItem('exam', JSON.stringify(updatedExam));
    }

    const startSavingExam = async () => {
        const exam = JSON.parse(localStorage.getItem('exam') || '[]');
        if (!exam || !exam.length) return;

        try {
            await anahuacApi.post('/exam/lectura/save', { exam });
            toast({
                description: "Tu progreso ha sido guardado.",
                variant: "done",
            })
        } catch (error) {
            console.error(error);
        }
    };

    return {
        // ? properties
        questions,
        activeQuestion,
        total,
        totalResponded,
        isLoading,
        specials,
        answeredQuestions,

        // ! methods
        startLoadingAllBlockQuestions,
        startLoadingSpecials,
        startLoadingActiveQuestion,
        startSaveLocalAnswer,
        startLoadingLocaleExam,
        startSavingExam,
    }
};