import { Navigate } from "react-router-dom";
import { AdminLayout } from "../admin/layout/AdminLayout";
import { HomePage } from "../admin/pages/HomePage";

export const AnahuacRoutes = [
    {
        path: '/',
        element: <AdminLayout/>,
        children: [
            {
                path: '/',
                element: <HomePage/>
            }
        ]
    },
    {
        path: '/*',
        element: <Navigate to="/"/>
    }
];