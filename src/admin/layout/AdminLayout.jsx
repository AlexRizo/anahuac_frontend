import { Outlet } from "react-router-dom"
import { NavbarMenu } from "../UI"
import { useCustomLocation } from "@/hooks"
import { Toaster } from "@/components/ui";

export const AdminLayout = () => {
    useCustomLocation();

    return (
        <section className="flex bg-slate-50">
            <NavbarMenu />

            <Outlet />

            <Toaster />
        </section>
    )
}