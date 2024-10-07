import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AppRouter } from "./router/AppRouter"
import { useAuthStore } from "./hooks";

export const App = () => {
    const { status } = useAuthStore();

    return <RouterProvider router={ createBrowserRouter(AppRouter(status)) } />
}
