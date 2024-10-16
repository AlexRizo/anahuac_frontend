import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    keys: [],
    total: 0,
    isLoading: 'loading', // loading, loaded, error
};

export const keysSlice = createSlice({
    name: 'keys',
    initialState,
    reducers: {
        onLoadKeys: (state, { payload }) => {
            state.keys = payload;
            state.total = payload.length;
            state.isLoading = 'loaded';
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
    },
});

export const { onLoadKeys, setIsLoading } = keysSlice.actions;