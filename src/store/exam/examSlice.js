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
        },
    },
});

export const { onSetAnsweredQuestions, onLoadQuestions, onSetActiveQuestion, setIsLoading, onLoadSpecial, onLoadExamLevel } = examSlice.actions;