import anahiacApi from "@/api/api";
import { onLoading, onLoadingResult } from "@/store/results/resultsSlice";
import { useDispatch, useSelector } from "react-redux";

export const useResultStore = () => {
    const { result, isLoading } = useSelector(state => state.result);
    const dispatch = useDispatch();
    
    const startLoadingAspirantResult = async (aspId) => {
        dispatch(onLoading('loading'));
        try {
            const { data } = await anahiacApi.get(`/exam/get/aspirant/results/${aspId}`);

            dispatch(onLoadingResult(data.results));
        } catch (error) {
            console.log(error);
            dispatch(onLoading('loaded'));
        }
    }
    
    return {
        //? properties
        result,
        isLoading,

        //? methods
        startLoadingAspirantResult,
    }
}