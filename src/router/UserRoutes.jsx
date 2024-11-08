import { Navigate } from "react-router-dom";
import { UserLayout } from "../user/layout/UserLayout";
import { HomePage, LecturaPage, MatematicasPage } from "../user/pages";

export const UserRoutes = [
    {
        path: '/',
        element: <UserLayout/>,
        children: [
            {
                path: '/',
                element: <HomePage/>
            },
            {
                path: '/examen/exap-lectura',
                element: <LecturaPage/>
            },
            {
                path: '/examen/exap-matematicas',
                element: <MatematicasPage/>
            }
        ]
    },
    {
        path: '/*',
        element: <Navigate to="/"/>
    }
];