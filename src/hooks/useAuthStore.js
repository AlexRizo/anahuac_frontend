import { useDispatch, useSelector } from "react-redux";
import { onChecking, onClearErrorMessage, onLogin, onLogout, onSetChecking } from "../store/auth/authSlice";
import { default as anahuacApi } from "../api/api";
import { useToast } from "./use-toast";
import { useUiStore } from "./useUiStore";

export const useAuthStore = () => {
    const { toast } = useToast();
    const dispatch = useDispatch();
    const { status, user, errorMessage } = useSelector((state) => state.auth);
    const { setComingSoon } = useUiStore();

    const startLogin = async (email, password) => {
        dispatch(onChecking());

        try {
            const { data } = await anahuacApi.post("/auth/login", { email, password });
            localStorage.setItem("token", data.token); 
            localStorage.setItem("token-init-date", new Date().getTime());
            dispatch(onLogin({
                user: {
                    uid: data.user.uid,
                    username: data.user.username,
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
                    username: data.user.username,
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

            if (data.status === 'pending') {
                setComingSoon(true);
                dispatch(onSetChecking('not-authenticated'));
                return toast({
                    title: "Registro exitoso",
                    description: data.message,
                    variant: "success",
                });
            }

            localStorage.setItem("token", data.token); 
            localStorage.setItem("token-init-date", new Date().getTime());
            dispatch(onLogin({
                user: {
                    uid: data.user.uid,
                    username: data.user.username,
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
                    username: data.user.username,
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

    const startCheckEmailForResetPassword = async (email) => {
        dispatch(onChecking());
        
        try {
            const { data } = await anahuacApi.patch('/auth/reset-password', { email });
            dispatch(onSetChecking(data.status || 'token-expired'));
            console.log({ data });
        } catch (error) {
            console.error(error);

            const errorMessage = error?.response?.data.message ||
                (error?.response?.data?.errors && Object.values(error.response.data.errors).map((err) => err.msg).join(", ")) ||
                "Ha ocurrido un error inesperado. Inténtalo de nuevo o más tarde. Si el error persiste comunícate con el administrador. (ERROR: 500)";
            
            dispatch(onLogout('* ' + errorMessage));

            toast({
                title: "Ha ocurrido un error",
                description: errorMessage,
                variant: "destructive",
            });
        }
    };

    const checkResetToken = async (token) => {
        try {
            const { data } = await anahuacApi.get(`/auth/reset-password/${ token }`);

            if (data.status === 'token-expired') {
                dispatch(onSetChecking(data.status || 'token-expired'));
            }
        } catch (error) {
            console.error(error);
            dispatch(onSetChecking('token-expired'));
        }
    }

    const startResetPassword = async (token, password) => {
        dispatch(onChecking());

        try {
            const { data } = await anahuacApi.patch(`/auth/reset-password/${ token }`, { password });
            console.log( data.message );
            dispatch(onSetChecking('reset-success'));
        } catch (error) {
            console.error(error);

            const errorMessage = error?.response?.data.message ||
                (error?.response?.data?.errors && Object.values(error.response.data.errors).map((err) => err.msg).join(", ")) ||
                "Ha ocurrido un error inesperado. Inténtalo de nuevo o más tarde. Si el error persiste comunícate con el administrador. (ERROR: 500)";
            
            dispatch(onLogout('* ' + errorMessage));

            toast({
                title: "Ha ocurrido un error",
                description: errorMessage,
                variant: "destructive",
            });
        }
    }

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
        startCheckEmailForResetPassword,
        checkResetToken,
        startResetPassword,
    }
};