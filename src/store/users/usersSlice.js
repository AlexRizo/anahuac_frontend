import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    admins: [],
    alumns: [],
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        onSetUsers: (state, { payload }) => {
            state.admins = payload.admins;
            state.alumns = payload.alumns;
        },
        onSetAlumns: (state, { payload }) => {
            state.alumns = payload;
        },
        onSetAdmins: (state, { payload }) => {
            state.admins = payload;
        }
    },
});

export const { onSetUsers, onSetAdmins, onSetAlumns } = usersSlice.actions;