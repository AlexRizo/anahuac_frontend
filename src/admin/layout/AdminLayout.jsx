import { Outlet } from "react-router-dom"
import { NavbarMenu } from "../UI"
import { useCustomLocation, useAdminsStore } from "@/hooks"
import { Toaster } from "@/components/ui";
import { useEffect } from "react";

export const AdminLayout = () => {

    const { startLoadingAdmins } = useAdminsStore();
    
    useCustomLocation();

    useEffect(() => {
        startLoadingAdmins();
    }, []);

    return (
        <section className="flex bg-slate-50">
            <NavbarMenu />

            <Outlet />

            <Toaster />
        </section>
    )
}