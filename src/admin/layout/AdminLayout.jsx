import { Outlet } from "react-router-dom"
import { NavbarMenu } from "../UI"
import { useCustomLocation } from "@/hooks"

export const AdminLayout = () => {
    
    useCustomLocation();

    return (
        <section className="flex bg-slate-50">
            <NavbarMenu />

            <Outlet />
        </section>
    )
}