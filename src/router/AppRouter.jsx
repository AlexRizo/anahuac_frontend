import { AdminRoutes } from "./AdminRoutes";
import { AuthRoutes } from "./AuthRoutes";
import { UserRoutes } from "./UserRoutes";

export const AppRouter = (status = 'checking', role = null, exam_level = 1) => {
    if (status === 'authenticated') {
        if (role === 'ASPIRANT_ROLE') {
            return UserRoutes(exam_level);
        } else {
            return AdminRoutes;
        }
    } else {
        return AuthRoutes;
    }
}