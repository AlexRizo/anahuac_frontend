import { Outlet } from "react-router-dom"
import { NavbarMenu } from "../UI"

export const AdminLayout = () => {
    
    return (
        <section className="flex bg-slate-50">
            <NavbarMenu />

            <Outlet />
        </section>
    )
}
