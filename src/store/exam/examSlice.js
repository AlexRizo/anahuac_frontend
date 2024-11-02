import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    questions: [],
    activeQuestion: undefined,
    answeredQuestions: [],
    specials: [],
    total: null,
    totalResponded: null,
    isLoading: 'loading',
};

export const examSlice = createSlice({
    name: 'exam',
    initialState,
    reducers: {
        onLoadQuestions: (state, { payload }) => {
            state.questions = payload;
            state.total = payload.length;
            state.totalResponded = payload.filter(question => question.response).length;
        },
        onSetActiveQuestion: (state, { payload }) => {
            state.activeQuestion = payload;
        },
        onLoadSpecial: (state, { payload }) => {
            state.specials = payload;
        },
        onSetAnswerQuestion: (state, { payload }) => {
            state.answeredQuestions = payload;
            state.totalResponded = state.answeredQuestions.length;
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
    },
});

export const { onSetAnswerQuestion, onLoadQuestions, onSetActiveQuestion, setIsLoading, onLoadSpecial } = examSlice.actions;