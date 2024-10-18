import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    errorMessage: undefined,
    user: {},
    aspirant: null,
    status: 'checking',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload.user;
            state.errorMessage = undefined;
        },
        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        onClearErrorMessage: (state) => {
            state.errorMessage = undefined;
        },
        onSaveAspirant: (state, { payload }) => {
            state.aspirant = payload.aspirant;
            state.errorMessage = undefined;
        }
    },
});

export const { onChecking, onLogin, onLogout, onSaveAspirant, onClearErrorMessage } = authSlice.actions;