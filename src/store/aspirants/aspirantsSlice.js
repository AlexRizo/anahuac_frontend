import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    aspirants: [],
    activeAspirant: null,
    loading: 'loaded', // error, loading, loaded
    message: null,
    ok: false,
};

export const aspirantsSlice = createSlice({
    name: 'aspirants',
    initialState,
    reducers: {
        onLoadAspirants: (state, { payload }) => {
            state.aspirants = payload;
            state.loading = 'loaded';
            state.message = null;
            state.activeAspirant = null;
            state.ok = false;
        },
        onAddAspirant: (state, { payload }) => {
            state.aspirants = [...state.aspirants, payload ];
            state.loading = 'loaded';
            state.message = null;
            state.ok = true;
            state.activeAspirant = payload;
        },
        onUpdateAspirant: (state, { payload }) => {
            state.aspirants = state.aspirants.map(aspirant => 
                aspirant.id === payload.id ? payload : aspirant
            );
            state.loading = 'loaded';
            state.message = null;
            state.ok = true;
        },
        onRemoveAspirant: (state, { payload }) => {
            state.aspirants = state.aspirants.filter(aspirant => aspirant.id !== payload);
            state.loading = 'loaded';
            state.message = null;
            state.ok = false;
        },
        setActiveAspirant: (state, { payload }) => {
            state.activeAspirant = payload;
        },
        setLoadState: (state, { payload }) => {
            state.loading = payload;
            if (payload === 'loading') state.aspirants = [];
        },
        setMessage: (state, { payload }) => {
            state.message = payload;
        },
        setOk: (state, { payload }) => {
            state.ok = payload;
        },
    },
});

export const { onLoadAspirants, onAddAspirant, onUpdateAspirant, onRemoveAspirant, setActiveAspirant, setLoadState, setMessage, setOk } = aspirantsSlice.actions;