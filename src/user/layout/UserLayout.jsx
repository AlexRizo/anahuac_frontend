import { Toaster } from "@/components/ui"
import { Outlet } from "react-router-dom"

export const UserLayout = () => {
    return (
        <>
            <Outlet />

            <Toaster />
        </>
    )
}
