import anahiacApi from "@/api/api";
import { onLoading, onLoadingResult } from "@/store/results/resultsSlice";
import { useDispatch, useSelector } from "react-redux";

export const useResultStore = () => {
    const { result, aspirant, isLoading } = useSelector(state => state.result);
    const dispatch = useDispatch();
    
    const startLoadingAspirantResult = async (aspId) => {
        dispatch(onLoading('loading'));
        try {
            const { data } = await anahiacApi.get(`/exam/get/aspirant/results/${aspId}`);

            const { lecturaAnswers, matematicasAnswers, pensamientoAnswers } = data.results;
            
            const allAnswers = [...lecturaAnswers, ...matematicasAnswers, ...pensamientoAnswers].sort((a, b) => a.questionNumber - b.questionNumber);

            console.log({ allAnswers});
            
            dispatch(onLoadingResult({ aspirant: data.results.aspirant, allAnswers: allAnswers }));
        } catch (error) {
            console.log(error);
            dispatch(onLoading('loaded'));
        }
    }
    
    return {
        //? properties
        result,
        aspirant,
        isLoading,

        //? methods
        startLoadingAspirantResult,
    }
}