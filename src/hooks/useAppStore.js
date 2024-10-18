import { addDays } from "date-fns";
import anahuacApi from "@/api/api";
import { useDispatch, useSelector } from "react-redux";
import { useToast, useKeysStore } from "./";
import {
  onAddApplication,
  onLoadApplications,
  onRemoveApplication,
  setActiveApplication,
  setLoadState,
  setMessage,
  setOk,
} from "@/store/app/appSlice";

export const useAppStore = () => {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { activeApplication, applications, isLoading, ok, message } = useSelector((state) => state.app);
    const { startCleanKeys } = useKeysStore();

    const onSetMessage = (message) => {
        const errorMessage = message?.response?.data.message ||
                             (message?.response?.data?.errors && Object.values(message.response.data.errors).map((err) => err.msg).join(", ")) ||
                             "Ha ocurrido un error inesperado. Inténtalo de nuevo o más tarde. Si el error persiste comunícate con el administrador. (ERROR: 500)";

        console.log(message);
        dispatch(setMessage(errorMessage));
    };
    
    const startLoadingApps = async({ page = 1, limit = 10 }) => {
        dispatch(setLoadState('loading'));
        startCleanKeys();
        
        try {
            const { data } = await anahuacApi.get('/application/getapps', { params: { page, limit } });
            dispatch(onLoadApplications(data.applications));
            return data.pages; // ? return the number of pages;
        } catch (error) {
            dispatch(setLoadState('error'));
            onSetMessage(error);
        }
    };

    const startLoadingAppsByDate = async ({ page, from = new Date(), to = addDays(new Date(), 7) }) => {
        dispatch(setLoadState('loading'));

        try {
            const { data } = await anahuacApi.get('/application/getappsbydate', { params: { page, from, to } });
            console.log({data});
            dispatch(onLoadApplications(data.applications));
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
                dispatch(onAddApplication(data.application));
            } else {
                dispatch(setLoadState('loaded'));
                dispatch(setOk(true));
            }
            dispatch(setActiveApplication({ keys: data.keys, ...data.application }));
        } catch (error) {
            dispatch(setLoadState('error'));
            onSetMessage(error);
        }
    };

    const startUpdateApp = async (app) => {
        dispatch(setLoadState('loading'));

        try {
            const { data } = await anahuacApi.put(`/application/updateapp/${ app.id }`, app);
            dispatch(setActiveApplication(data.application));
            dispatch(setLoadState('loaded'));
            dispatch(setOk(true));
        } catch (error) {
            dispatch(setLoadState('error'));
            onSetMessage(error);
        }
    }

    const startDeleteApp = async ({ id, name }) => {
        dispatch(setLoadState('loading'));

        try {
            await anahuacApi.delete(`/application/deleteapp/${ id }`);
            dispatch(onRemoveApplication(id));
            dispatch(setLoadState('loaded'));
            dispatch(setOk(true));
            toast({
                title: 'Aplicación eliminada',
                description: `La aplicación con el ID: ${ name } se ha eliminado correctamente`,
                variant: 'success',
            })
        } catch (error) {
            dispatch(setLoadState('error'));
            onSetMessage(error);
            toast({
                title: 'Error al eliminar',
                description: `La aplicación con el ID: ${ name } no se ha podido eliminar. Inténtalo de nuevo o más tarde.`,
                variant: 'destructive',
            })
        }
    };

    const startLoadActiveApplication = async (id) => {
        dispatch(setLoadState('loading'));

        try {
            const { data } = await anahuacApi.get(`/application/getapp/${ id }`);
            dispatch(setActiveApplication(data.application));
            dispatch(setLoadState('loaded'));
        } catch (error) {
            dispatch(setLoadState('error'));
            onSetMessage(error);
        }
    };

    const startSetActiveApplication = (id) => {
        const app = applications.find((app) => app.id === id);
        dispatch(setActiveApplication(app));
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
        startUpdateApp,
        startDeleteApp,
        startLoadingApps,
        startLoadingAppsByDate,
        startLoadActiveApplication,
        startSetActiveApplication,
    };
};