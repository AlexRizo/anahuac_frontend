import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AppRouter } from "./router/AppRouter"
import { useAuthStore } from "./hooks";

export const App = () => {
    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, []);

    return <RouterProvider router={ createBrowserRouter(AppRouter(status)) } />
}
