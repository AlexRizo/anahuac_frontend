import { AnahuacRoutes } from "./AnahuacRoutes";
import { AuthRoutes } from "./AuthRoutes";

export const AppRouter = (status = 'checking') => {
    if (status === 'authenticated') {
        return AnahuacRoutes;
    } else {
        return AuthRoutes;
    }
}