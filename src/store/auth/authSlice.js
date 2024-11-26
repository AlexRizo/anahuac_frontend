import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    errorMessage: undefined,
    user: {},
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
        onSetChecking: (state, { payload }) => {
            state.status = payload;
        }
    },
});

export const { onChecking, onLogin, onLogout, onClearErrorMessage, onSetChecking } = authSlice.actions;