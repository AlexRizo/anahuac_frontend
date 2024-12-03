import { Navigate } from "react-router-dom";
import { ConfirmPassword, LoginAdmin, LoginUser, ResetPassword } from "../auth/pages";

export const AuthRoutes = [
    {
        path: '/auth',
        element: <LoginUser/>
    },
    {
        path: '/admin',
        element: <Navigate to="/admin/auth"/>
    },
    {
        path: '/admin/auth',
        element: <LoginAdmin/>
    },
    {
        path: '/admin/reset-password',
        element: <ResetPassword/>
    },
    {
        path: '/admin/reset-password/:token',
        element: <ConfirmPassword/>
    },
    {
        path: '/*',
        element: <Navigate to="/auth"/>
    }
];