import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    aspirants: [],
    activeAspirant: null,
    loading: 'loading', // error, loading, loaded
    message: null,
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
        },
        onAddAspirant: (state, { payload }) => {
            state.aspirants = [...state.aspirants, payload ];
            state.loading = 'loaded';
            state.message = null;
            state.activeAspirant = payload;
        },
        onUpdateAspirant: (state, { payload }) => {
            state.aspirants = state.aspirants.map(aspirant => 
                aspirant.id === payload.id ? payload : aspirant
            );
            state.loading = 'loaded';
            state.message = null;
        },
        onRemoveAspirant: (state, { payload }) => {
            state.aspirants = state.aspirants.filter(aspirant => aspirant.id !== payload);
            state.loading = 'loaded';
            state.message = null;
        },
        setActiveAspirant: (state, { payload }) => {
            state.activeAspirant = payload;
        },
        setLoadState: (state, { payload }) => {
            state.loading = payload;
            // if (payload === 'loading') state.aspirants = [];
        },
        setMessage: (state, { payload }) => {
            state.message = payload;
        },
    },
});

export const { onLoadAspirants, onAddAspirant, onUpdateAspirant, onRemoveAspirant, setActiveAspirant, setLoadState, setMessage } = aspirantsSlice.actions;