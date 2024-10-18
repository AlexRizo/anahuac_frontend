import { onAddKey, onCleanKeys, onLoadKeys, setIsLoading, setMessage } from "@/store/keys/keysSlice";
import { useDispatch, useSelector } from "react-redux";
import anahiacApi from "@/api/api";
import { useToast } from "./use-toast";

export const useKeysStore = () => {
    const dispatch = useDispatch();
    const { keys, total, isLoading } = useSelector( state => state.key );
    const { toast } = useToast();

    const onSetMessage = (message) => {
        const errorMessage = message?.response?.data.message ||
                             (message?.response?.data?.errors && Object.values(message.response.data.errors).map((err) => err.msg).join(", ")) ||
                             "Ha ocurrido un error inesperado. Inténtalo de nuevo o más tarde. Si el error persiste comunícate con el administrador. (ERROR: 500)";

        console.log(message);
        dispatch(setMessage(errorMessage));
    };

    const startLoadingKeys = async (id) => {
        dispatch(setIsLoading('loading'));

        try {
            const { data } = await anahiacApi.get(`/keys/getkeys/${ id }`);
            dispatch(onLoadKeys(data.keys));
        } catch (error) {
            dispatch(setIsLoading('error'));
            onSetMessage(error);
            toast({
                title: 'Ha ocurrido un error',
                description: 'Ocurrió un error al intentar cargar las claves.',
                variant: 'destructive',
            })
        };
    };

    const startAddKeys = async (id, keys) => {
        dispatch(setIsLoading('loading'));

        try {
            const { data } = await anahiacApi.post(`/keys/addkeys/${ id }`, { keys });
            dispatch(onAddKey(data.keys));
            toast({
                title: 'Claves creadas',
                description: `Se han creado ${ keys } claves corréctamente.`,
            })
        } catch (error) {
            dispatch(setIsLoading('error'));
            dispatch(setMessage(error));
            toast({
                title: 'Ha ocurrido un error',
                description: 'Ocurrió un error al intentar crear las claves. Inténtalo de nuevo.',
                variant: 'destructive',
            });
        };
    };

    const startCleanKeys = () => {
        dispatch(onCleanKeys());
    };
    
    return {
        // ? propiertys
        keys,
        total,
        isLoading,

        // ? methods
        startLoadingKeys,
        startCleanKeys,
        startAddKeys,
    }
};