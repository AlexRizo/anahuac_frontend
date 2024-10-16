import { Outlet } from "react-router-dom"
import { NavbarMenu } from "../UI"
import { useCustomLocation, useUsersStore } from "@/hooks"
import { Toaster } from "@/components/ui";
import { useEffect } from "react";

export const AdminLayout = () => {

    const { startLoadingAdmins } = useUsersStore();
    
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