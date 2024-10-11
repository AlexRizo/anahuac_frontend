import { AdminRoutes } from "./AdminRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { UserRoutes } from "./UserRoutes";

export const AppRouter = (status = 'checking', role = null) => {
    if (status === 'authenticated') {
        if (role === 'ADMIN_USER') {
            return AdminRoutes;
        } else {
            return UserRoutes;
        }
    } else {
        return AuthRoutes;
    }
}