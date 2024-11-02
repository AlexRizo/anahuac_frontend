import { Navigate } from "react-router-dom";
import { UserLayout } from "../user/layout/UserLayout";
import { HomePage, LecturaPage } from "../user/pages";

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
            }
        ]
    },
    {
        path: '/*',
        element: <Navigate to="/"/>
    }
];