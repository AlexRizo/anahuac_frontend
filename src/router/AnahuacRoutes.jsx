import { Navigate } from "react-router-dom";
import { AdminLayout } from "../admin/layout/AdminLayout";
import { HomePage } from "../admin/pages/HomePage";

export const AnahuacRoutes = [
    {
        path: '/admin',
        element: <AdminLayout/>,
        children: [
            {
                path: '/home',
                element: <HomePage/>
            }
        ]
    },
    {
        path: '/*',
        element: <Navigate to="/admin"/>
    }
];