import { onSetAnsweredQuestions, onLoadQuestions, onLoadSpecial, onSetActiveQuestion, setIsLoading, onLoadExamLevel } from "@/store/exam/examSlice";
import { useDispatch, useSelector } from "react-redux";
import anahuacApi from "@/api/api";
import { useToast } from "./use-toast";
import { useNavigate } from "react-router-dom";

export const useExamStore = () => {
    const { questions, answeredQuestions, activeQuestion, total, totalResponded, isLoading, specials, exam_level } = useSelector(state => state.exam);
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const { toast } = useToast();
    const dispatch = useDispatch();

    const startSetExceptionMessage = (exception) => {
        const message = exception?.response?.data.message ||
        (exception?.response?.data?.errors && Object.values(exception.response.data.errors).map((err) => err.msg).join(", ")) ||
        "Ha ocurrido un error inesperado. Inténtalo de nuevo o más tarde. Si el error persiste comunícate con el administrador. (ERROR: 500)";

        console.error(exception);

        toast({
            title: 'Ha ocurrido un error',
            description: message,
            variant: 'destructive',
        });
    };

    const startLoadingAllBlockQuestions = async () => {
        dispatch(setIsLoading('loading'));
        
        try {
            const { data } = await anahuacApi.get('/exam/lectura/questions');
            dispatch(onLoadQuestions(data.questions));
            dispatch(onLoadExamLevel(data.exam_level));
            await startLoadingSpecials();
            await startLoadingUserExamResults(user.uid);
            dispatch(setIsLoading('loaded'));
        } catch (error) {
            startSetExceptionMessage(error);
            dispatch(setIsLoading('error'));
        }
    };

    const startLoadingSpecials = async () => {
        try{
            const { data } = await anahuacApi.get('/exam/getarticles');
            dispatch(onLoadSpecial(data.articles));
        } catch (error) {
            startSetExceptionMessage(error);
            dispatch(setIsLoading('error'));
        }
    };

    const startLoadingUserExamResults = async (uid) => {
        const localExamExists = localStorage.getItem('exam');

        try {
            if (!localExamExists) {
                const { data } = await anahuacApi.get(`/aspirants/${uid}/exam/results`, { params: { block: 'lectura' } });
                dispatch(onSetAnsweredQuestions(data.results));
                dispatch(onLoadExamLevel(data.exam_level));
                localStorage.setItem('exam', JSON.stringify(data.results));
                return;
            }
        } catch (error) {
            startSetExceptionMessage(error);
            dispatch(setIsLoading('error'));
        }
    };

    const startLoadingActiveQuestion = (question) => {
        dispatch(onSetActiveQuestion(question));
    };

    const startLoadingLocaleExam = () => {
        const localExam = JSON.parse(localStorage.getItem('exam') || '[]');
        dispatch(onSetAnsweredQuestions(localExam));
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
    
        dispatch(onSetAnsweredQuestions(updatedExam));

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
            startSetExceptionMessage(error);
        }
    };

    const startSavingExamAndNextLevel = async () => {
        const exam = JSON.parse(localStorage.getItem('exam') || '[]');
        if (!exam || !exam.length) return;

        try {
            await anahuacApi.post('/exam/saveandnext', { exam }, { params: { exam_level } });
            toast({
                description: "Tu progreso ha sido guardado.",
                variant: "done",
            });
            navigate('/examen/exap-matematicas');
        } catch (error) {
            startSetExceptionMessage(error);
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
        exam_level,

        // ! methods
        startLoadingAllBlockQuestions,
        startSavingExamAndNextLevel,
        startLoadingSpecials,
        startLoadingActiveQuestion,
        startSaveLocalAnswer,
        startLoadingLocaleExam,
        startSavingExam,
    }
};