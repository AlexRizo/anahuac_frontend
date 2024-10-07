import { Navigate } from "react-router-dom";
import { LoginAdmin, LoginUser } from "../auth";

export const AuthRoutes = [
    {
        path: '/auth',
        element: <LoginUser/>
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