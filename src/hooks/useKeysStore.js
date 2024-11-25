import { onAddKey, onCleanKeys, onInvalidatedKey, onLoadKeys, onValidatedKey, onValidatingKey, setIsLoading, setMessage } from "@/store/keys";
import { useDispatch, useSelector } from "react-redux";
import anahiacApi from "@/api/api";
import { useToast } from "./use-toast";

export const useKeysStore = () => {
    const dispatch = useDispatch();
    const { keys, total, isLoading } = useSelector( state => state.key );
    const { key, status:validateKeyStatus, errorMessage } = useSelector( state => state.keyValidation );
    const { toast } = useToast();

    const onSetMessage = (message, useToast = false) => {
        const errorMessage = message?.response?.data.message ||
            (message?.response?.data?.errors && Object.values(message.response.data.errors).map((err) => err.msg).join(", ")) ||
            "Ha ocurrido un error inesperado. Inténtalo de nuevo o más tarde. Si el error persiste comunícate con el administrador. (ERROR: 500)";

        console.log(message);
        dispatch(setMessage(errorMessage));

        if (useToast) {
            toast({
                title: 'Ha ocurrido un error',
                description: errorMessage,
                variant: 'destructive',
            });
        }
    };

    const startLoadingKeys = async (id) => {
        dispatch(setIsLoading('loading'));

        try {
            const { data } = await anahiacApi.get(`/keys/getkeys/${ id }`);
            dispatch(onLoadKeys(data.keys));
        } catch (error) {
            dispatch(setIsLoading('error'));
            onSetMessage(error, true);
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
            onSetMessage(error, true);
        };
    };

    const startValidateKey = async (key) => {
        dispatch(onValidatingKey());

        try {
            const { data } = await anahiacApi.post('/keys/checkkey', { key });
            dispatch(onValidatedKey(data.key));
        } catch (error) {
            const errorMessage = error?.response?.data.message ||
                (error?.response?.data?.errors && Object.values(error.response.data.errors).map((err) => err.msg).join(", ")) ||
                "Ha ocurrido un error inesperado. Inténtalo de nuevo o más tarde. Si el error persiste comunícate con el administrador. (ERROR: 500)"
            dispatch(onInvalidatedKey(errorMessage));
            onSetMessage(error, true);
        }
    }

    const startCleanKeys = () => {
        dispatch(onCleanKeys());
    };
    
    return {        
        // ? propiertys
        // * keySlice
        keys,
        total,
        isLoading,

        // * keyValidationSlice
        key,
        validateKeyStatus,
        errorMessage,

        // ? methods
        // * keySlice
        startLoadingKeys,
        startCleanKeys,
        startAddKeys,
        
        // * keyValidationSlice
        startValidateKey,
    }
};