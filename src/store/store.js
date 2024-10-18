import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { uiSlice } from "./ui/uiSlice";
import { appSlice } from "./app/appSlice";
import { usersSlice } from "./users/usersSlice";
import { aspirantsSlice } from "./aspirants/aspirantsSlice";
import { keysSlice, keyValidationSlice } from "./keys";

export const store = configureStore({
    middleware: getDefaultMiddleware => getDefaultMiddleware(
        {
            serializableCheck: false
        }
    ),
    reducer: {
        //? Add the reducer here
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        app: appSlice.reducer,
        users: usersSlice.reducer,
        key: keysSlice.reducer,
        keyValidation: keyValidationSlice.reducer,
        aspirant: aspirantsSlice.reducer,
    },
});