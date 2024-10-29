import { useDispatch, useSelector } from "react-redux";
import { useToast } from "./";
import { onLoadAdmins, onRemoveAdmin, setActiveAdmin, setLoadState, setMessage, setOk } from "@/store/admins/adminsSlice";
import anahuacApi from '@/api/api.js';

export const useAdminsStore = () => {
    const dispatch = useDispatch();
    const { admins, activeAdmin, loading, message, ok } = useSelector(state => state.admins);
    const { toast } = useToast();

    const onSetMessage = (message, setToast = true) => {
        console.log(message);
        
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

    const startSavingAdmin = async (admin) => {
        dispatch(setLoadState('loading'));

        try {
            const { data } = await anahuacApi.post('/admin/createadmin', admin);
            dispatch(setActiveAdmin(data.admin));
            dispatch(setLoadState('loaded'));
            dispatch(setOk(true));
            return data;
        } catch (error) {
            dispatch(setLoadState('error'));
            onSetMessage(error, false);
        }
    };

    const startUpdatingAdmin = async (id, admin) => {
        dispatch(setLoadState('loading'));

        try {
            const { data } = await anahuacApi.put(`/admin/updateadmin/${ id }`, admin);
            dispatch(setActiveAdmin(data.admin));
            dispatch(setLoadState('loaded'));
            dispatch(setOk(true));
        } catch (error) {
            dispatch(setLoadState('error'));
            onSetMessage(error, false);
        }
    };

    const startDeletingAdmin = async ({ id, name }) => {
        try {
            await anahuacApi.patch(`/admin/deactivateadmin/${ id }`);
            dispatch(onRemoveAdmin(id));
            toast({
                title: "Administrador eliminado",
                description: `El administrador ${ name } ha sido eliminado correctamente.`,
                variant: "success",
            });
        } catch (error) {
            dispatch(setLoadState('error'));
            onSetMessage(error);
            toast({
                title: "Ha ocurrido un error",
                description: `No se ha podido eliminar al administrador ${ name }. Por favor, inténtalo de nuevo.`,
                variant: "destructive",
            });
        }
    }

    const startClearActiveAdmin = () => {
        dispatch(setActiveAdmin(null));
    };

    const startSetActiveAdmin = (id) => {
        const admin = admins.find(admin => admin.id === id);
        dispatch(setActiveAdmin(admin));
    }

    const startLoadingActiveAdmin = async (id) => {
        dispatch(setLoadState('loading'));

        try {
            const { data } = await anahuacApi.get(`/admin/getadmin/${ id }`);
            dispatch(setActiveAdmin(data.admin));
            dispatch(setLoadState('loaded'));
        } catch (error) {
            dispatch(setLoadState('error'));
            onSetMessage(error);
        }
    }
    
    return {
        // ? properties
        admins,
        activeAdmin,
        loading,
        message,
        ok,
        
        // ? methods
        startSavingAdmin,
        startLoadingAdmins,
        startUpdatingAdmin,
        startDeletingAdmin,
        startSetActiveAdmin,
        startClearActiveAdmin,
        startLoadingActiveAdmin,
    }
};