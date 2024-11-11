import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AppRouter } from "./router/AppRouter"
import { useAuthStore, useExamStore, useUiStore } from "./hooks";

export const App = () => {
    const { status, user, checkAuthToken } = useAuthStore();
    const { getSystemStatus } = useUiStore();
    const { exam_level } = useExamStore();

    useEffect(() => {
        checkAuthToken();
        getSystemStatus();
    }, []);
    
    return <RouterProvider router={ createBrowserRouter(AppRouter(status, user?.role, exam_level)) } />
}
