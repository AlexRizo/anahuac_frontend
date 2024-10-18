import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    key: null,
    status: 'not-validated', // not-validated, validating, validated
    errorMessage: null
};

export const keyValidationSlice = createSlice({
    name: 'keyValidation',
    initialState,
    reducers: {
        onValidatingKey: (state) => {
            state.status = 'validating';
            state.key = null;
            state.errorMessage = null;
        },
        onValidatedKey: (state, { payload }) => {
            state.status = 'validated';
            state.key = payload.key;
            state.errorMessage = null;
        },
        onInvalidatedKey: (state, { payload }) => {
            state.status = 'not-validated';
            state.key = null;
            state.errorMessage = payload;
        },
        onCleanKeyValidation: (state) => {
            state.status = 'not-validated';
            state.key = null;
            state.errorMessage = null;
        }
    },
});

export const { onValidatingKey, onValidatedKey, onInvalidatedKey, onCleanKeyValidation } = keyValidationSlice.actions;