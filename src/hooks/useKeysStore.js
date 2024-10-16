import { onLoadKeys, setIsLoading } from "@/store/keys/keysSlice";
import { useDispatch, useSelector } from "react-redux";
import anahiacApi from "@/api/api";

export const useKeysStore = () => {
    const dispatch = useDispatch();
    const { keys, total, isLoading } = useSelector( state => state.keys );
    
    const startLoadingKeys = async (id) => {
        dispatch(setIsLoading('loading'));

        try {
            const { data } = await anahiacApi.get(`/keys/getkeys/${ id }`);
            dispatch(onLoadKeys(data.keys));
        } catch (error) {
            console.log(error);
        };
    };
    
    return {
        // ? propiertys
        keys,
        total,
        isLoading,

        // ? methods
        startLoadingKeys,
    }
};