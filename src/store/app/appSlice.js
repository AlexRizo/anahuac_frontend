import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeApplication: null,
    applications: [],
    isLoading: 'loaded', // error, loading, loaded
    message: null, // null, true, false
    ok: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        onLoadApplications: (state, { payload }) => {
            state.applications = payload;
            state.isLoading = 'loaded';
            state.message = null;
            state.activeApplication = null,
            state.ok = false;
        },
        onAddApplication: (state, { payload }) => {
            state.applications = [...state.applications, payload];
            state.isLoading = 'loaded';
            state.message = null;
            state.ok = true;
            state.activeApplication = payload;
        },
        onRemoveApplication: (state, { payload }) => {
            state.applications = state.applications.filter(application => application.id !== payload);
            state.isLoading = 'loaded';
            state.message = null;
            state.ok = true;
        },
        onUpdateApplication: (state, { payload }) => {
            state.applications = state.applications.map(application => 
                application.id === payload.id ? payload : application
            );
            state.isLoading = 'loaded';
            state.message = null;
            state.ok = true;
        },
        setLoadState: (state, { payload }) => {
            state.isLoading = payload;
        },
        setMessage: (state, { payload }) => {
            state.message = payload;
        },
        setOk: (state, { payload }) => {
            state.ok = payload;
        },
        setActiveApplication: (state, { payload }) => {
            state.activeApplication = payload;
        },
    },
});

export const {
  onLoadApplications,
  onAddApplication,
  onUpdateApplication,
  onRemoveApplication,
  setActiveApplication,
  setLoadState,
  setMessage,
  setOk,
} = appSlice.actions;