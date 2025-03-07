import { Album, CalendarDays, FileBadge, House, LogOut, UserCog, Users } from "lucide-react"
import { NavItem, SAPAC } from "../components"
import { Button, Label, Switch } from "@/components/ui"
import { useAuthStore, useUiStore } from "@/hooks"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const menu = [
    {
        children: (<> <House strokeWidth={1.25} /> Dashboard </>),
        path: '/'
    },
    {
        children: (<> <CalendarDays strokeWidth={1.25} /> Aplicaciones </>),
        path: '/aplicaciones'
    },
    {
        children: (<> <Users strokeWidth={1.25} /> Aspirantes </>),
        path: '/aspirantes'
    },
    {
        children: (<> <FileBadge strokeWidth={1.25} /> Resultados </>),
        path: '/resultados'
    },
    {
        children: (<> <UserCog strokeWidth={1.25} /> Staff </>),
        path: '/staff'
    },
    {
        children: (<> <Album strokeWidth={1.25} /> Exámenes </>),
        path: '/examenes'
    },
]

export const NavbarMenu = () => {
    const { startLogout, user } = useAuthStore();
    const { systemStatus, setSystemStatus } = useUiStore();
    const navigate = useNavigate();

    const [isChecked, setIsChecked] = useState(systemStatus);

    useEffect(() => {
        setIsChecked(systemStatus);
    }, [systemStatus]);

    const handleSwitchChange = async (checked) => {
        setIsChecked(setSystemStatus(checked));
    };

    const handleLogout = () => {
        startLogout();
        navigate('/admin');
    };
    
    return (
        <div className="bg-[#F6F6F6] min-w-[266px] h-screen p-4 pl-8 flex flex-col justify-between">
            <div>
                <SAPAC className="mb-8"/>
                <nav className="flex flex-col items-center justify-center w-full gap-1">
                    {
                        menu.map((item, index) => {
                            if (item.path === '/staff' && user.role !== 'ADMIN_ROLE') return;

                            if (item.path === '/examenes' && user.role === 'APPLICATOR_ROLE') return;
                            
                            return (
                                <NavItem 
                                    key={ index }
                                    path={ item.path }
                                >
                                    { item.children }
                                </NavItem>
                            )
                        })
                    }
                    <Button 
                        className="w-full justify-start gap-2"
                        onClick={ handleLogout }
                    >
                        <LogOut strokeWidth={1.25} />
                        Cerrar sesión
                    </Button>
                </nav>
            </div>
            {
                user.role === 'ADMIN_ROLE' && (
                    <div className="flex items-center justify-center gap-2">
                        <Label htmlFor="system_status">
                            Estado del sistema
                        </Label>
                        <Switch id="system_status" checked={ isChecked } onCheckedChange={ handleSwitchChange } />
                    </div>
                )
            }
        </div>
    )
}
