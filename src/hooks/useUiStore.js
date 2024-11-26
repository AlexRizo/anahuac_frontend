import { useDispatch, useSelector } from "react-redux";
import { default as anahuacApi } from "../api/api";
import { onActiveSystem, onComingSoon } from "@/store/ui/uiSlice";

export const useUiStore = () => {
    const dispatch = useDispatch();

    const { systemStatus, comingSoon } = useSelector((state) => state.ui);
    
    const setSystemStatus = async(value) => {
        try {
            await anahuacApi.put("/ui/updateui", { name: "systemStatus", value });
            dispatch(onActiveSystem(value));
            alert(`Se ha actualizado el estado del sistema. El acceso para los alumnos queda ${ value ? "habilitado" : "inhabilitado" }.`);
            return value;
        } catch (error) {
            console.log({ error });
            alert('No se ha podido actualizar el estado del sistema. Error: ' + error.response.data.message);
            return !value;
        }
    };
    
    const getSystemStatus = async() => {
        try {
            const { data } = await anahuacApi.get("/ui/getsystemstatus");
            if (data.systemStatus.value) {
                dispatch(onActiveSystem(data.systemStatus.value));
            }
        } catch (error) {
            console.warn('No se ha podido comunicar con el servicio. Error: 500');
            console.log({error});
        }
    };

    const setComingSoon = async(status = false) => {
        dispatch(onComingSoon(status));
    };

    return {
        // ? values
        systemStatus,
        comingSoon,
        
        // ? methods
        setSystemStatus,
        getSystemStatus,
        setComingSoon,
    }
}