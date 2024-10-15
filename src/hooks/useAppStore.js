import { onAddApplication, onLoadApplications, setLoadState, setMessage } from "@/store/app/appSlice";
import { useDispatch, useSelector } from "react-redux";
import anahuacApi from "@/api/api";


export const useAppStore = () => {
    const dispatch = useDispatch();
    const { applications, isLoading, ok, message } = useSelector((state) => state.app);

    const onSetMessage = (message) => {
        const errorMessage = message?.response?.data.message ||
                             (message?.response?.data?.errors && Object.values(message.response.data.errors).map((err) => err.msg).join(", ")) ||
                             "Ha ocurrido un error inesperado. Inténtalo de nuevo o más tarde. Si el error persiste comunícate con el administrador. (ERROR: 500)";

        console.log(message);
        
        dispatch(setMessage(errorMessage));
    };
    
    const startLoadingApps = async() => {
        dispatch(setLoadState('loading'));
        
        try {
            const { data } = await anahuacApi.get('/application/getapps');
            dispatch(onLoadApplications(data.applications));
        } catch (error) {
            dispatch(setLoadState('error'));
            setMessage(error);
        }
    };

    const startCreateApp = async (app) => {
        dispatch(setLoadState('loading'));

        try {
            const { data } = await anahuacApi.post('/application/createapp', app);
            dispatch(onAddApplication(data.application));
        } catch (error) {
            dispatch(setLoadState('error'));
            onSetMessage(error);
        }
    };

    return {
        // ? properties
        applications,
        isLoading,
        message,
        ok,

        // ? methods
        startCreateApp,
        startLoadingApps,
    };
};