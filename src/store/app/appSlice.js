import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    applications: [],
    isLoading: 'loading', // loading, loaded
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        onLoadApplications: (state, { payload }) => {
            state.applications = payload;
            state.isLoading = 'loaded';
        },
        onAddApplication: (state, { payload }) => {
            state.applications = [...state.applications, payload];
        },
        onRemoveApplication: (state, { payload }) => {
            state.applications = state.applications.filter(application => application.id !== payload);
        },
        onUpdateApplication: (state, { payload }) => {
            state.applications = state.applications.map(application => 
                application.id === payload.id ? payload : application
            );
        },
        setLoadState: (state, { payload }) => {
            state.isLoading = payload;
        },
    },
});

export const {
  onLoadApplications,
  onAddApplication,
  onUpdateApplication,
  onRemoveApplication,
  setLoadState,
} = appSlice.actions;