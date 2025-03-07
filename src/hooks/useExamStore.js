import { onSetAnsweredQuestions, onLoadQuestions, onLoadSpecial, onSetActiveQuestion, setIsLoading, onLoadExamLevel, onRestartExam, onLoadExams, setScorePerExam } from "@/store/exam/examSlice";
import { useDispatch, useSelector } from "react-redux";
import anahuacApi from "@/api/api";
import { useToast } from "./use-toast";

export const useExamStore = () => {
    const { questions, exams, answeredQuestions, activeQuestion, total, totalResponded, isLoading, specials, exam_level, currentExam } = useSelector(state => state.exam);
    const { user } = useSelector(state => state.auth);
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

    const startResetExam = () => {
        localStorage.removeItem('exam');
        dispatch(onRestartExam());
    };

    const startLoadingExamLevel = async () => {
        try {
            const { data } = await anahuacApi.get(`/aspirants/${ user.uid }/exam/level`);
            dispatch(onLoadExamLevel(data.exam_level));
        } catch (error) {
            startSetExceptionMessage(error);
        }
    };

    const startLoadingAllBlockQuestions = async (model) => {
        dispatch(setIsLoading('loading'));
        
        if (!model) return toast({
            title: 'Hmmm...',
            description: '¿Modificaste el código?.',
            variant: 'destructive',
        });
        
        try {
            if (model === 'lectura') {
                const { data } = await anahuacApi.get('/exam/lectura/questions');

                const block1 = data.questions.filter((question) => question.relation === '672279a3a3f880dfc5b70a8a').sort(() => Math.random() - 0.5);
                const block2 = data.questions.filter((question) => question.relation === '67228afb1d0fcdd16996d872').sort(() => Math.random() - 0.5);
                const block3 = data.questions.filter((question) => question.relation === '6722937322a8c5bd203084a4').sort(() => Math.random() - 0.5);

                const shuffleBlocks = [block1, block2, block3];
                
                dispatch(onLoadQuestions(shuffleBlocks.flat()));
                await startLoadingSpecials();
            } else if (model === 'matematicas') {
                const { data } = await anahuacApi.get('/exam/matematicas/questions');
                dispatch(onLoadQuestions(data.questions.sort(() => Math.random() - 0.5)));
            } else if (model === 'pensamiento') {
                const { data } = await anahuacApi.get('/exam/pensamiento/questions');

                const questions = data.questions || [];
                const blocks = [(questions[questions.length - 3]).questionNumber, (questions[questions.length - 2]).questionNumber, (questions[questions.length - 1]).questionNumber];

                const questionsBlock = questions.filter(question => blocks.includes(question.questionNumber));
                const sortedQuestions = questions.filter(question => !blocks.includes(question.questionNumber)).sort(() => Math.random() - 0.5);

                
                const randomIndex = Math.floor(Math.random() * (sortedQuestions.length + 1));
                
                sortedQuestions.splice(randomIndex, 0, ...questionsBlock);
                
                // console.log(finalQuestions, randomIndex);

                dispatch(onLoadQuestions(sortedQuestions));
            }

            await startLoadingUserExamResults(user.uid, model);
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

    const startLoadingUserExamResults = async (uid, block) => {
        const localExamExists = JSON.parse(localStorage.getItem('exam') || '[]');

        try {
            if (!localExamExists.length) {
                const { data } = await anahuacApi.get(`/aspirants/${uid}/exam/results`, { params: { block } });
                dispatch(onSetAnsweredQuestions(data.results));
                localStorage.setItem('exam', JSON.stringify(data.results));
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

    const startSavingExam = async (model = '') => {
        const exam = JSON.parse(localStorage.getItem('exam') || '[]');
        if (!exam || !exam.length) return;

        try {
            await anahuacApi.post(`/exam/${ model }/save`, { exam });
            toast({
                description: "Tu progreso ha sido guardado.",
                variant: "done",
            })
        } catch (error) {
            startSetExceptionMessage(error);
        }
    };

    const startSavingExamAndNextLevel = async () => {
        dispatch(setIsLoading('loading'));
        const exam = JSON.parse(localStorage.getItem('exam') || '[]');
        if (!exam || !exam.length) {
            dispatch(setIsLoading('error'));
            return toast({
                title: 'Hmmm...',
                description: 'Contesta al menos una pregunta.',
                variant: 'destructive',
            });
        };

        try {
            const { data } = await anahuacApi.post('/exam/saveandnext', { exam }, { params: { exam_level } });
            startResetExam();
            
            toast({
                description: "Tu progreso ha sido guardado.",
                variant: "done",
            });

            dispatch(onLoadExamLevel(data.examResult.exam_level));
            dispatch(setIsLoading('loaded'));
        } catch (error) {
            startSetExceptionMessage(error);
        }
    };

    const startLoadingExams = async () => {
        dispatch(setIsLoading('loading'));

        try {
            const { data } = await anahuacApi.get('/exam/get');
            dispatch(onLoadExams(data.exams));
        } catch (error) {
            startSetExceptionMessage(error);
            dispatch(setIsLoading('error'));
        }
    };

    const startLoadingAllQuestionsWithCorrectAnswer = async (origin) => {
        if (!origin) return;
        dispatch(setIsLoading('loading'));

        try {
            const { data } = await anahuacApi.get(`/exam/get/questions/${ origin }`);
            dispatch(onLoadQuestions(data.questions));
            dispatch(setScorePerExam(data.exam));
            dispatch(setIsLoading('loaded'));
        } catch (error) {
            startSetExceptionMessage(error);
            dispatch(setIsLoading('error'));
        }
    };

    return {
        // ? properties
        exams,
        questions,
        activeQuestion,
        total,
        totalResponded,
        isLoading,
        specials,
        answeredQuestions,
        exam_level,
        currentExam,
        
        // ! methods
        startLoadingAllQuestionsWithCorrectAnswer,
        startLoadingAllBlockQuestions,
        startSavingExamAndNextLevel,
        startLoadingSpecials,
        startLoadingActiveQuestion,
        startSaveLocalAnswer,
        startLoadingLocaleExam,
        startSavingExam,
        startLoadingExamLevel,
        startResetExam,
        startLoadingExams,
    }
};