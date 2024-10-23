import { useDispatch, useSelector } from "react-redux";
import { onLoadAspirants, setActiveAspirant, setLoadState, setMessage } from "@/store/aspirants/aspirantsSlice";
import { useToast } from "./";
import anahuacApi from "@/api/api";

export const useAspirantsStore = () => {
    const { toast } = useToast();
    const dispatch = useDispatch();
    const { activeAspirant, aspirants, loading, message, ok } = useSelector((state) => state.aspirant);

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
            })
        }
    };

    const startLoadingActiveAspirant = async(id) => {
        dispatch(setLoadState('loading'));

        try {
            const { data } = await anahuacApi.get(`/aspirants/getaspirant/${ id }`);
            dispatch(setActiveAspirant(data.aspirant));
            dispatch(setLoadState('loaded'));
        } catch (error) {
            dispatch(setLoadState('error'));
            onSetMessage(error);
        }
    }
    
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

    const startManualSavingAspirant = async(aspirant) => {
        dispatch(setLoadState('loading'));

        try {
            const { data } = await anahuacApi.post('/aspirants/registermanualaspirant', aspirant);
            dispatch(setActiveAspirant(data.aspirant));
            dispatch(setLoadState('loaded'));
        } catch (error) {
            dispatch(setLoadState('error'));
            onSetMessage(error, false);
        }
    }

    const startUpdateAspirant = async (aspirant) => {
        dispatch(setLoadState('loading'));

        try {
            const { data } = await anahuacApi.put(`/aspirants/updateaspirant/${ aspirant.id }`, aspirant);
            dispatch(setActiveAspirant(data.aspirant));
            dispatch(setLoadState('loaded'));
        } catch (error) {
            dispatch(setLoadState('error'));
            onSetMessage(error, false);
        }
    };

    const startSetActiveAspirant = (id) => {
        const aspirant = aspirants.find((asp) => asp.id === id);
        dispatch(setActiveAspirant(aspirant));
    };

    const startClearActiveAspirant = () => {
        dispatch(setActiveAspirant(null));
    }

    return {
        // ? properties
        activeAspirant,
        aspirants,
        loading,
        message,
        ok,

        // ? methods
        startUpdateAspirant,
        startLoadingAspirants,
        startSetActiveAspirant,
        startClearActiveAspirant,
        startManualSavingAspirant,
        startLoadingActiveAspirant,
    };
}