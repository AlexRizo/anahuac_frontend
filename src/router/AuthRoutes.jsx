import { Navigate } from "react-router-dom";
import { LoginAdmin, LoginUser } from "../auth/pages";

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
        path: '/*',
        element: <Navigate to="/auth"/>
    }
];