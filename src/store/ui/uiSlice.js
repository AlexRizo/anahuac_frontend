import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    systemStatus: false,
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        onActiveSystem: (state, { payload }) => {
            state.systemStatus = payload;
        },
    },
});

export const { onActiveSystem } = uiSlice.actions;