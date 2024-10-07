import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'checking',
    user: {},
    errorMessage: undefined
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
            state.status = 'unauthenticated';
            state.user = {};
            state.errorMessage = payload.errorMessage;
        },
        onClearErrorMessage: (state) => {
            state.errorMessage = undefined;
        },
    },
});

export const { onChecking, onLogin, onLogout, onClearErrorMessage } = authSlice.actions;