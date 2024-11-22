import { Navigate } from "react-router-dom";
import { AdminLayout } from "../admin/layout/AdminLayout";
import { HomePage, ApplicationsPage, NewApplicationPage, EditApplicationPage, ApplicationKeysPage, AspirantsPage, NewAspirantPage, EditAspirantPage, StaffPage, NewStaffPage, EditStaffPage, ResultsPage, ExamenesPage  } from "@/admin/pages";
import { ExamQuestionsPage } from "@/admin/pages/ExamQuestionsPage";

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
            },
            {
                path: '/aspirantes/editar/:id',
                element: <EditAspirantPage />
            },
            {
                path: '/staff',
                element: <StaffPage />
            },
            {
                path: '/staff/nuevo',
                element: <NewStaffPage />
            },
            {
                path: '/staff/editar/:id',
                element: <EditStaffPage />
            },
            {
                path: '/resultados',
                element: <ResultsPage />
            },
            {
                path: '/examenes',
                element: <ExamenesPage />
            },
            {
                path: '/examenes/:id/preguntas',
                element: <ExamQuestionsPage />
            }
        ]
    },
    {
        path: '/*',
        element: <Navigate to={ lastRoute }/>
    }
];