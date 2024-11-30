import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    result: {},
    isLoading: 'loading',
};

export const resultsSlice = createSlice({
    name: 'results',
    initialState,
    reducers: {
        onLoadingResult: (state, { payload }) => {
            state.result = payload;
            state.isLoading = 'loaded';
        },
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        }
    },
});

export const { onLoadingResult, onLoading } = resultsSlice.actions;