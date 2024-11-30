import { Navigate } from "react-router-dom";
import { AdminLayout } from "../admin/layout/AdminLayout";
import { HomePage, ApplicationsPage, NewApplicationPage, EditApplicationPage, ApplicationKeysPage, AspirantsPage, NewAspirantPage, EditAspirantPage, StaffPage, NewStaffPage, EditStaffPage, ResultsPage, ExamenesPage  } from "@/admin/pages";
import { ExamQuestionsPage } from "@/admin/pages/ExamQuestionsPage";

const lastRoute = localStorage.getItem('lastRoute') || '/';

export const AdminRoutes = (role) => {
    return [
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
                    element: (role !== 'ADMIN_ROLE') ? <Navigate to={ lastRoute }/> : <StaffPage />
                },
                {
                    path: '/staff/nuevo',
                    element: (role !== 'ADMIN_ROLE') ? <Navigate to={ lastRoute }/> : <NewStaffPage />
                },
                {
                    path: '/staff/editar/:id',
                    element: (role !== 'ADMIN_ROLE') ? <Navigate to={ lastRoute }/> : <EditStaffPage />
                },
                {
                    path: '/resultados',
                    element: <ResultsPage />
                },
                {
                    path: '/examenes',
                    element: (role === 'APPLICATOR_ROLE') ? <Navigate to={ lastRoute }/> : <ExamenesPage />
                },
                {
                    path: '/examenes/:id/preguntas',
                    element: (role === 'APPLICATOR_ROLE') ? <Navigate to={ lastRoute }/> : <ExamenesPage />
                }
            ]
        },
        {
            path: '/*',
            element: <Navigate to={ lastRoute }/>
        }
    ];
}
