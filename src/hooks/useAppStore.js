import { onAddApplication, onLoadApplications, setLoadState } from "@/store/app/appSlice";
import { useDispatch, useSelector } from "react-redux";
import anahuacApi from "@/api/api";

export const useAppStore = () => {
    const dispatch = useDispatch();

    const { applications } = useSelector((state) => state.app);

    const startLoadingApps = async() => {
        dispatch(setLoadState('loading'));

        try {
            const { data } = await anahuacApi.get('/application/getapps');
            dispatch(onLoadApplications(data.applications));
        } catch (error) {
            console.log(error);
            dispatch(setLoadState('loaded'));
        }
    };

    const startCreateApp = async (app) => {
        dispatch(setLoadState('loading'));

        try {
            const { data } = await anahuacApi.post('/application/createapp', app);
            dispatch(onAddApplication(data.application));
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