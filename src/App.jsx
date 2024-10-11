import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AppRouter } from "./router/AppRouter"
import { useAuthStore, useUiStore } from "./hooks";

export const App = () => {
    const { status, user, checkAuthToken } = useAuthStore();
    const { getSystemStatus } = useUiStore();

    useEffect(() => {
        checkAuthToken();
        getSystemStatus();
    }, []);
    
    return <RouterProvider router={ createBrowserRouter(AppRouter(status, user?.role)) } />
}
