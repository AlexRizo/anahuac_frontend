import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    questions: [],
    activeQuestion: undefined,
    answeredQuestions: [],
    specials: [],
    total: null,
    totalResponded: null,
    isLoading: 'loading',
    exam_level: 0,
};

export const examSlice = createSlice({
    name: 'exam',
    initialState,
    reducers: {
        onLoadQuestions: (state, { payload }) => {
            
            const block1 = payload.filter((question) => question.relation === '672279a3a3f880dfc5b70a8a').sort(() => Math.random() - 0.5);
            const block2 = payload.filter((question) => question.relation === '67228afb1d0fcdd16996d872').sort(() => Math.random() - 0.5);
            const block3 = payload.filter((question) => question.relation === '6722937322a8c5bd203084a4').sort(() => Math.random() - 0.5);

            const shuffleBlocks = [block1, block2, block3].sort(() => Math.random() - 0.5);

            state.questions = [shuffleBlocks[0], shuffleBlocks[1], shuffleBlocks[2]].flat();
            state.total = payload.length;
        },
        onSetActiveQuestion: (state, { payload }) => {
            state.activeQuestion = payload;
        },
        onLoadSpecial: (state, { payload }) => {
            state.specials = payload;
        },
        onSetAnsweredQuestions: (state, { payload }) => {
            state.answeredQuestions = payload;
            state.totalResponded = state.answeredQuestions.length;
        },
        onLoadExamLevel: (state, { payload }) => {
            state.exam_level = payload;
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        onRestartExam: (state) => {
            state.answeredQuestions = [];
            state.specials = [];
            state.total = 0;
            state.totalResponded = 0;
        }
    },
});

export const { onSetAnsweredQuestions, onLoadQuestions, onSetActiveQuestion, setIsLoading, onLoadSpecial, onLoadExamLevel, onRestartExam } = examSlice.actions;