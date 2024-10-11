import { Navigate } from "react-router-dom";
import { AdminLayout } from "../admin/layout/AdminLayout";
import { HomePage } from "../admin/pages/HomePage";
import { ApplicationsPage } from "@/admin/pages";

export const AdminRoutes = [
    {
        path: '/',
        element: <AdminLayout/>,
        children: [
            {
                path: '/',
                element: <HomePage/>
            },
            {
                path: '/aplicaciones',
                element: <ApplicationsPage />
            }
        ]
    },
    {
        path: '/*',
        element: <Navigate to="/"/>
    }
];