import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { uiSlice } from "./ui/uiSlice";
import { appSlice } from "./app/appSlice";
import { aspirantsSlice } from "./aspirants/aspirantsSlice";
import { keysSlice, keyValidationSlice } from "./keys";
import { adminsSlice } from "./admins/adminsSlice";
import { examSlice } from "./exam/examSlice";
import { resultsSlice } from "./results/resultsSlice";

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
        key: keysSlice.reducer,
        keyValidation: keyValidationSlice.reducer,
        aspirant: aspirantsSlice.reducer,
        admins: adminsSlice.reducer,
        exam: examSlice.reducer,
        result: resultsSlice.reducer,
    },
});