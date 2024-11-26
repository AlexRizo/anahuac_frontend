import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    systemStatus: false,
    comingSoon: false,
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        onActiveSystem: (state, { payload }) => {
            state.systemStatus = payload;
        },
        onComingSoon: (state, { payload }) => {
            state.comingSoon = payload;
        }
    },
});

export const { onActiveSystem, onComingSoon } = uiSlice.actions;