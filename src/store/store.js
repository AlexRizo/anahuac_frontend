import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";

export const store = configureStore({
    reducer: {
        //? Add the reducer here
        auth: authSlice.reducer,
    },
});