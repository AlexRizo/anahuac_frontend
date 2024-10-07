import { useDispatch, useSelector } from "react-redux";
import { onChecking, onLogin, onLogout } from "../store/auth/authSlice";
import { default as anahuacApi } from "../api/api";

export const useAuthStore = () => {
    const dispatch = useDispatch();
    const { status, user, errorMessage } = useSelector((state) => state.auth);

    const startLogin = async (email, password) => {
        dispatch(onChecking());

        try {
            const { data } = await anahuacApi.post("/auth/login/admin", {email, password});
            localStorage.setItem("token", data.token); 
            localStorage.setItem("token-init-date", new Date().getTime());
            dispatch(onLogin({
                user: {
                    uid: data.user.uid,
                    name: data.user.name,
                }
            })) 
        } catch (error) {
            console.error(error.response);
            dispatch(onLogout());
        }
    }

    
    return {
        // ? values
        status,
        user,
        errorMessage,
        
        // ? functions
        startLogin,
    }
};