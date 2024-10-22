import { useDispatch, useSelector } from "react-redux";
import { onChecking, onLogin, onLogout } from "../store/auth/authSlice";
import { default as anahuacApi } from "../api/api";
import { useToast } from "./use-toast";

export const useAuthStore = () => {
    const { toast } = useToast();
    const dispatch = useDispatch();
    const { status, user, aspirant, errorMessage } = useSelector((state) => state.auth);

    const startLogin = async (email, password) => {
        dispatch(onChecking());

        try {
            const { data } = await anahuacApi.post("/auth/login", { email, password });
            localStorage.setItem("token", data.token); 
            localStorage.setItem("token-init-date", new Date().getTime());
            dispatch(onLogin({
                user: {
                    uid: data.user.uid,
                    name: data.user.name,
                    role: data.user.role,
                }
            })) 
        } catch (error) {
            const errorMessage = error?.response?.data.message ||
                                 (error?.response?.data?.errors && Object.values(error.response.data.errors).map((err) => err.msg).join(", ")) ||
                                 "Ha ocurrido un error inesperado. Inténtalo de nuevo o más tarde. Si el error persiste comunícate con el administrador. (ERROR: 500)";

            dispatch(onLogout(errorMessage));
        }
    }

    const startLogout = (message = undefined) => {
        localStorage.clear();
        dispatch(onLogout(message));
    };

    const checkAuthToken = async () => {
        const token = localStorage.getItem("token");

        if (!token) return dispatch(onLogout());

        try {
            const { data } = await anahuacApi.get("/auth/renew");
            localStorage.setItem("token", data.token);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch(onLogin({
                user: {
                    uid: data.user.uid,
                    name: data.user.name,
                    role: data.user.role,
                }
            }));
        } catch (error) {
            console.log({ error });            
            startLogout();
        }
    };

    const startSavingAspirant = async (aspirant) => {
        dispatch(onChecking());

        try {
            const { data } = await anahuacApi.post("/aspirants/registeraspirant", aspirant);
            localStorage.setItem("token", data.token); 
            localStorage.setItem("token-init-date", new Date().getTime());
            dispatch(onLogin({
                user: {
                    uid: data.user.uid,
                    name: data.user.name,
                    role: data.user.role,
                }
        }));
        } catch (error) {
            console.log(error);
            
            const errorMessage = error?.response?.data.message ||
                                 (error?.response?.data.errors && Object.values(error.response.data.errors).map((err) => err.msg).join(", ") ||
                                 "Ha ocurrido un error inesperado. Inténtalo de nuevo o más tarde. Si el error persiste comunícate con el administrador. (ERROR: 500)");

            dispatch(onLogout(errorMessage));
            toast({
                title: "Ha ocurrido un error",
                description: errorMessage,
                variant: "destructive",
            });
        }
    };
    
    const startLoginAspirant = async ({ aspirant_id, password }) => {
        dispatch(onChecking());
        
        try {
            const { data } = await anahuacApi.post("/auth/loginaspirant", { aspirant_id, password });
            localStorage.setItem("token", data.token); 
            localStorage.setItem("token-init-date", new Date().getTime());
            dispatch(onLogin({
                user: {
                    uid: data.user.uid,
                    name: data.user.name,
                    role: data.user.role,
                }
            }));
        } catch (error) {
            const errorMessage = error?.response?.data.message ||
                                 (error?.response?.data?.errors && Object.values(error.response.data.errors).map((err) => err.msg).join(", ")) ||
                                 "Ha ocurrido un error inesperado. Inténtalo de nuevo o más tarde. Si el error persiste comunícate con el administrador. (ERROR: 500)";

            console.log(error);
                                 
            dispatch(onLogout(errorMessage));
        }
    };
    
    return {
        // ? values
        status,
        user,
        errorMessage,
        
        // ? methods
        startLogin,
        startLogout,
        checkAuthToken,
        startLoginAspirant,
        startSavingAspirant,
    }
};