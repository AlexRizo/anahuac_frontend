import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { uiSlice } from "./ui/uiSlice";

export const store = configureStore({
    reducer: {
        //? Add the reducer here
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
    },
});