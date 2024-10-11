import { Navigate } from "react-router-dom";
import { UserLayout } from "../user/layout/UserLayout";
import { HomePage } from "../user/pages/HomePage";

export const UserRoutes = [
    {
        path: '/',
        element: <UserLayout/>,
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