import { useDispatch, useSelector } from "react-redux";
import { onChecking, onLogin, onLogout } from "../store/auth/authSlice";
import { default as anahuacApi } from "../api/api";

export const useAuthStore = () => {
    const dispatch = useDispatch();
    const { status, user, errorMessage } = useSelector((state) => state.auth);

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
            dispatch(onLogout(error.response.data.message || Object.values(error.response.data.errors).map((error) => error.message).join(", ")));
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

    
    return {
        // ? values
        status,
        user,
        errorMessage,
        
        // ? methods
        startLogin,
        startLogout,
        checkAuthToken,
    }
};