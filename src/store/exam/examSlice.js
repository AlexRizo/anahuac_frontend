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
    exams: []
};

export const examSlice = createSlice({
    name: 'exam',
    initialState,
    reducers: {
        onLoadQuestions: (state, { payload }) => {
            state.questions = payload;
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
            if (payload === 'loading') {
                state.exams = [];
            }
        },
        onRestartExam: (state) => {
            state.answeredQuestions = [];
            state.specials = [];
            state.total = 0;
            state.totalResponded = 0;
        },
        onLoadExams: (state, { payload }) => {
            state.exams = payload;
            state.isLoading = 'loaded';
        },
    },
});

export const { onSetAnsweredQuestions, onLoadQuestions, onSetActiveQuestion, setIsLoading, onLoadSpecial, onLoadExamLevel, onRestartExam, onLoadExams } = examSlice.actions;