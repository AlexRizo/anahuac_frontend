import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { uiSlice } from "./ui/uiSlice";
import { appSlice } from "./app/appSlice";

export const store = configureStore({
    reducer: {
        //? Add the reducer here
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        app: appSlice.reducer,
    },
});