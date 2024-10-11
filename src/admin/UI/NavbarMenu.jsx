import { CalendarDays, FileBadge, House, LogOut, UserCog, Users } from "lucide-react"
import { NavItem, SAPAC } from "../components"
import { Button, Label, Switch } from "@/components/ui"
import { useAuthStore, useUiStore } from "@/hooks"
import { useEffect, useState } from "react"

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
]

export const NavbarMenu = () => {
    const { startLogout } = useAuthStore();
    const { systemStatus, setSystemStatus } = useUiStore();

    const [isChecked, setIsChecked] = useState(systemStatus);

    useEffect(() => {
        setIsChecked(systemStatus);
    }, [systemStatus]);

    const handleSwitchChange = async (checked) => {
        setIsChecked(setSystemStatus(checked));
    };
    
    return (
        <div className="bg-[#F6F6F6] min-w-[266px] h-screen p-4 pl-8 flex flex-col justify-between">
            <div>
                <SAPAC className="mb-8"/>
                <nav className="flex flex-col items-center justify-center w-full gap-1">
                    {
                        menu.map((item, index) => (
                            <NavItem key={ index } path={ item.path }>
                                { item.children }
                            </NavItem>
                        ))
                    }
                    <Button 
                        className="w-full justify-start gap-2"
                        onClick={ () => startLogout() }
                    >
                        <LogOut strokeWidth={1.25} />
                        Cerrar sesión
                    </Button>
                </nav>
            </div>
            <div className="flex items-center justify-center gap-2">
                <Label htmlFor="system_status">
                    Estado del sistema
                </Label>
                <Switch id="system_status" checked={ isChecked } onCheckedChange={ handleSwitchChange } />
            </div>
        </div>
    )
}
