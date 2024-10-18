import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    keys: [],
    total: 0,
    isLoading: 'loading', // loading, loaded, error
    message: null
};

export const keysSlice = createSlice({
    name: 'keys',
    initialState,
    reducers: {
        onLoadKeys: (state, { payload }) => {
            state.keys = payload;
            state.total = payload.length;
            state.isLoading = 'loaded';
            state.message = null;
        },
        onAddKey: (state, { payload }) => {
            const keys = payload.map(key => (key));
            
            state.keys = [...state.keys, ...keys];
            state.total = state.keys.length;
            state.isLoading = 'loaded';
        },
        onCleanKeys: (state) => {
            state.keys = [];
            state.total = 0;
            state.isLoading = 'loaded';
            state.message = null;
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        },
        setMessage: (state, { payload }) => {
            state.message = payload;
        },
    },
});

export const { onLoadKeys, onAddKey, onCleanKeys, setIsLoading, setMessage } = keysSlice.actions;