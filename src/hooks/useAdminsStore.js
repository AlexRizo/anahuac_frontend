import { useDispatch, useSelector } from "react-redux";
import { useToast } from "./";
import { onLoadAdmins, setActiveAdmin, setLoadState, setMessage } from "@/store/admins/adminsSlice";
import anahuacApi from '@/api/api.js';

export const useAdminsStore = () => {
    const dispatch = useDispatch();
    const { admins, activeAdmin, loading, message, ok } = useSelector(state => state.admins);
    const { toast } = useToast();

    const onSetMessage = (message, setToast = true) => {
        const errorMessage = message?.response?.data.message ||
            (message?.response?.data?.errors && Object.values(message.response.data.errors).map((err) => err.msg).join(", ")) ||
            "Ha ocurrido un error inesperado. Inténtalo de nuevo o más tarde. Si el error persiste comunícate con el administrador. (ERROR: 500)";

        dispatch(setMessage(errorMessage));

        if (setToast) {
            toast({
                title: "Ha ocurrido un error",
                description: errorMessage,
                variant: "destructive",
            });
        }
    };
    
    const startLoadingAdmins = async ({ page = 1, limit = 10, name = '' }) => {
        dispatch(setLoadState('loading'));

        try {
            const { data } = await anahuacApi.get('/admin/getadmins', { params: { page, limit, name } });
            dispatch(onLoadAdmins(data.admins));
            return data.pages;
        } catch (error) {
            dispatch(setLoadState('error'));
            onSetMessage(error);
        }
    };

    const startClearActiveAdmin = () => {
        dispatch(setActiveAdmin(null));
    };
    
    return {
        // ? properties
        admins,
        activeAdmin,
        loading,
        message,
        ok,
        
        // ? methods
        startLoadingAdmins,
        startClearActiveAdmin,
    }
};