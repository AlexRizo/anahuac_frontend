import { Navigate } from "react-router-dom";
import { UserLayout } from "../user/layout/UserLayout";
import { HomePage, LecturaPage, MatematicasPage, PensamientoPage } from "../user/pages";

export const UserRoutes = (exam_level) => {
    return [
        {
            path: '/',
            element: <UserLayout/>,
            children: [
                {
                    path: '/',
                    element: <HomePage/>
                },
                {
                    path: '/examen/exap',
                    element: (exam_level === 3) ? <PensamientoPage/> : exam_level === 2 ? <MatematicasPage/> : <LecturaPage/>
                }
            ]
        },
        {
            path: '/*',
            element: <Navigate to="/"/>
        }
    ];
}