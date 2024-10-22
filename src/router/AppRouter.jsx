import { AdminRoutes } from "./AdminRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { UserRoutes } from "./UserRoutes";

export const AppRouter = (status = 'checking', role = null) => {
    if (status === 'authenticated') {
        if (role === 'ASPIRANT_ROLE') {
            return UserRoutes;
        } else {
            return AdminRoutes;
        }
    } else {
        return AuthRoutes;
    }
}