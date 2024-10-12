import { onAddApplication, onLoadApplications, setLoadState } from "@/store/app/appSlice";
import { useDispatch, useSelector } from "react-redux";

export const useAppStore = () => {
    const dispatch = useDispatch();

    const { applications } = useSelector((state) => state.app);

    const startLoadingApps = async() => {
        dispatch(setLoadState('loading'));

        try {
            const { data } = await anahuacApi.get('/application/getapps');
            dispatch(onLoadApplications(data));
        } catch (error) {
            console.log(error);
            dispatch(setLoadState('loaded'));
        }
    };

    const startCreateApp = async (app) => {
        dispatch(setLoadState('loading'));

        try {
            const { data } = await anahuacApi.post('/application/createapp', app);
            dispatch(onAddApplication(data));
        } catch (error) {
            console.log(error);
            dispatch(setLoadState('loaded'));
        }
    };

    return {
        // ? properties
        applications,

        // ? methods
        startCreateApp,
        startLoadingApps,
    };
};