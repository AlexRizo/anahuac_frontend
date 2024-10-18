import { useDispatch, useSelector } from "react-redux";
import { onLoadAspirants, setActiveAspirant, setLoadState, setMessage } from "@/store/aspirants/aspirantsSlice";
import { useToast } from "./";
import anahuacApi from "@/api/api";

export const useAspirantsStore = () => {
    const { toast } = useToast();
    const dispatch = useDispatch();
    const { activeAspirant, aspirants, loading, message } = useSelector((state) => state.aspirant);
    const onSetMessage = (message) => {
        const errorMessage = message?.response?.data.message ||
            (message?.response?.data?.errors && Object.values(message.response.data.errors).map((err) => err.msg).join(", ")) ||
            "Ha ocurrido un error inesperado. Inténtalo de nuevo o más tarde. Si el error persiste comunícate con el administrador. (ERROR: 500)";

        console.log(message);
        dispatch(setMessage(errorMessage));
        toast({
            title: "Ha ocurrido un error",
            description: errorMessage,
            variant: "destructive",
        })
    };

    const startLoadingAspirants = async({ page = 1, limit = 10 }) => {
        dispatch(setLoadState('loading'));
        
        try {
            const { data } = await anahuacApi.get('/aspirants/getaspirants', { params: { page, limit } });
            dispatch(onLoadAspirants(data.aspirants));
            return data.pages; // ? return the number of pages;
        } catch (error) {
            dispatch(setLoadState('error'));
            onSetMessage(error);
        }
    };

    const startSetActiveAspirant = (data) => {
        dispatch(setActiveAspirant(data));
    };

    return {
        // ? properties
        activeAspirant,
        aspirants,
        loading,
        message,

        // ? methods
        startLoadingAspirants,
        startSetActiveAspirant,
    };
}