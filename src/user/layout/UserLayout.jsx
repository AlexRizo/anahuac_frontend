import { Toaster } from "@/components/ui"
import { useExamStore } from "@/hooks";
import { useEffect } from "react"
import { Outlet } from "react-router-dom"

export const UserLayout = () => {
    const { startLoadingExamLevel } = useExamStore();
    
    useEffect(() => {
        startLoadingExamLevel();
    }, []);
    
    return (
        <>
            <Outlet />

            <Toaster />
        </>
    )
}
