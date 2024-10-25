import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    admins: [],
    activeAdmin: null,
    loading: 'loaded', // error, loading, loaded
    message: null,
    ok: false,
};

export const adminsSlice = createSlice({
    name: 'admins',
    initialState,
    reducers: {
        onLoadAdmins: (state, { payload }) => {
            state.admins = payload;
            state.loading = 'loaded';
            state.message = null;
            state.activeAdmin = null;
            state.ok = false;
        },
        onAddAdmin: (state, { payload }) => {
            state.admins = [...state.admins, payload ];
            state.loading = 'loaded';
            state.message = null;
            state.ok = true;
            state.activeAdmin = payload;
        },
        onUpdateAdmin: (state, { payload }) => {
            state.admins = state.admins.map(admin => 
                admin.id === payload.id ? payload : admin
            );
            state.loading = 'loaded';
            state.message = null;
            state.ok = true;
        },
        onRemoveAdmin: (state, { payload }) => {
            state.admins = state.admins.filter(admin => admin.id !== payload);
            state.loading = 'loaded';
            state.message = null;
            state.ok = false;
        },
        setActiveAdmin: (state, { payload }) => {
            state.activeAdmin = payload;
        },
        setLoadState: (state, { payload }) => {
            state.loading = payload;
            if (payload === 'loading') state.admins = [];
        },
        setMessage: (state, { payload }) => {
            state.message = payload;
        },
        setOk: (state, { payload }) => {
            state.ok = payload;
        },
    },
});

export const { onAddAdmin, onLoadAdmins, onRemoveAdmin, onUpdateAdmin, setActiveAdmin, setLoadState, setMessage, setOk } = adminsSlice.actions;