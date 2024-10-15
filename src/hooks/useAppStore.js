import { onAddApplication, onLoadApplications, setActiveApplication, setLoadState, setMessage, setOk } from "@/store/app/appSlice";
import { useDispatch, useSelector } from "react-redux";
import anahuacApi from "@/api/api";
import { dataParser } from "@/admin/helpers";
import { addDays } from "date-fns";

export const useAppStore = () => {
    const dispatch = useDispatch();
    const { activeApplication, applications, isLoading, ok, message } = useSelector((state) => state.app);

    const onSetMessage = (message) => {
        const errorMessage = message?.response?.data.message ||
                             (message?.response?.data?.errors && Object.values(message.response.data.errors).map((err) => err.msg).join(", ")) ||
                             "Ha ocurrido un error inesperado. Inténtalo de nuevo o más tarde. Si el error persiste comunícate con el administrador. (ERROR: 500)";

        console.log(message);
        dispatch(setMessage(errorMessage));
    };
    
    const startLoadingApps = async({ page = 1, limit = 10 }) => {
        dispatch(setLoadState('loading'));
        
        try {
            const { data } = await anahuacApi.get('/application/getapps', { params: { page, limit } });
            dispatch(onLoadApplications(dataParser(data.applications)));
            return data.pages; // ? return the number of pages;
        } catch (error) {
            dispatch(setLoadState('error'));
            setMessage(error);
        }
    };

    const startLoadingAppsByDate = async ({ page, from = new Date(), to = addDays(new Date(), 7) }) => {
        dispatch(setLoadState('loading'));

        try {
            const { data } = await anahuacApi.get('/application/getappsbydate', { params: { page, from, to } });
            console.log({data});
            dispatch(onLoadApplications(dataParser(data.applications)));
            return data.pages; // ? return the number of pages;
        } catch (error) {
            dispatch(setLoadState('error'));
            onSetMessage(error);
        }
    };

    const startCreateApp = async (app) => {
        dispatch(setLoadState('loading'));

        try {
            const { data } = await anahuacApi.post('/application/createapp', app);
            if (applications.length < 10) {
                dispatch(onAddApplication(dataParser([data.application])[0]));
            } else {
                dispatch(setActiveApplication(dataParser([data.application])[0]));
                dispatch(setLoadState('loaded'));
                dispatch(setOk(true));
            }
        } catch (error) {
            dispatch(setLoadState('error'));
            onSetMessage(error);
        }
    };

    const cleanActiveApp = () => {
        dispatch(setLoadState('loaded'));
        dispatch(setMessage(null));
        dispatch(setOk(false));
        dispatch(setActiveApplication(null));
    };

    return {
        // ? properties
        activeApplication,
        cleanActiveApp,
        applications,
        isLoading,
        message,
        ok,

        // ? methods
        startCreateApp,
        startLoadingApps,
        startLoadingAppsByDate,
    };
};