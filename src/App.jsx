import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AppRouter } from "./router/AppRouter"
import { useAuthStore, useExamStore, useScreen, useUiStore } from "./hooks";

export const App = () => {
    const { status, user, checkAuthToken } = useAuthStore();
    const { getSystemStatus } = useUiStore();
    const { exam_level } = useExamStore();

    const { width } = useScreen();

    useEffect(() => {
        checkAuthToken();
        getSystemStatus();
    }, []);

    if (width < 1300) return (
        <div className="flex justify-center items-center h-screen bg-gray-100 px-10 bg-[url('/img/login_user/login-user.jpg')] bg-cover bg-no-repeat relative">
            <div className="absolute w-full h-full bg-[url('/img/login_user/login-user-bg.jpg')] bg-cover bg-no-repeat opacity-60"></div>
            <div className="bg-white shadow rounded p-5 relative">
                <h1 className="text-4xl mb-5">¡Ups!</h1>
                <h1 className="text-2xl">Parece que estás usando un dispositivo móvil.</h1>
            </div>
        </div>
    );
    
    return <RouterProvider router={ createBrowserRouter(AppRouter(status, user?.role, exam_level)) } />
}
