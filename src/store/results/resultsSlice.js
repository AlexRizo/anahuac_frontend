import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    aspirant: undefined,
    result: {},
    isLoading: 'loading',
};

export const resultsSlice = createSlice({
    name: 'results',
    initialState,
    reducers: {
        onLoadingResult: (state, { payload }) => {
            state.result = payload.allAnswers;
            state.aspirant = `${ payload.aspirant.first_name } ${ payload.aspirant.last_name_1 } ${ payload.aspirant.last_name_2 }`.trim();
            state.isLoading = 'loaded';
        },
        onLoading: (state, { payload }) => {
            state.isLoading = payload;
        }
    },
});

export const { onLoadingResult, onLoading } = resultsSlice.actions;