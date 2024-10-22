import { Navigate } from "react-router-dom";
import { AdminLayout } from "../admin/layout/AdminLayout";
import { HomePage, ApplicationsPage, NewApplicationPage, EditApplicationPage, ApplicationKeysPage, AspirantsPage, NewAspirantPage } from "@/admin/pages";

const lastRoute = localStorage.getItem('lastRoute') || '/';

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
                element: <ApplicationsPage />,
            },
            {
                path:'/aplicaciones/nueva',
                element: <NewApplicationPage />
            },
            {
                path: '/aplicaciones/:id/claves',
                element: <ApplicationKeysPage />
            },
            {
                path: '/aplicaciones/editar/:id',
                element: <EditApplicationPage />
            },
            {
                path: '/aspirantes',
                element: <AspirantsPage />
            },
            {
                path: '/aspirantes/nuevo',
                element: <NewAspirantPage />
            }
        ]
    },
    {
        path: '/*',
        element: <Navigate to={ lastRoute }/>
    }
];