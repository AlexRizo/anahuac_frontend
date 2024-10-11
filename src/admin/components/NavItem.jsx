import { Button } from "@/components/ui"
import { NavLink } from "react-router-dom"

export const NavItem = ({ children, path = '' }) => {
    return (
        <NavLink 
        to={ path }
        className="w-full">
        {({ isActive }) => (
            <Button 
                variant="ghost" 
                className={`w-full justify-start gap-2 hover:bg-[#E6E6E6] ${ isActive ? 'bg-[#E6E6E6]' : 'bg-white' }`}
            >
                { children }
            </Button>
        )}
        </NavLink>
    )
}
