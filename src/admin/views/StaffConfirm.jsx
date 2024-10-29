import { useAdminsStore } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { CalendarDays, UserPlus, Users } from "lucide-react";
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui";
import { parseAdminRole } from "../helpers";

export const StaffConfirm = () => {
    const { activeAdmin:admin } = useAdminsStore();

    const navigate = useNavigate();
    
    const handleNavigate = (route) => {
        navigate(route);
    }
    
    return (
        <Card className="w-[627px] mt-10">
            <CardHeader>
                <CardTitle className="text-base">Datos del staff</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex border-b pb-4 pt-6">
                    <p className="w-full">Nombre</p>
                    <p className="w-full">{`${ admin.first_name } ${ admin.last_name }`}</p>
                </div>
                <div className="flex border-b pb-4 pt-6">
                    <p className="w-full">Usuario</p>
                    <p className="w-full">{ admin.username }</p>
                </div>
                <div className="flex border-b pb-4 pt-6">
                    <p className="w-full">Correo Electrónico</p>
                    <p className="w-full">{ admin.email }</p>
                </div>
                <div className="flex border-b pb-4 pt-6">
                    <p className="w-full">Rol</p>
                    <p className="w-full">{ parseAdminRole(admin.role) }</p>
                </div>
            </CardContent>
            <CardFooter className="justify-between gap-2">
                <Button className="gap-2 w-full" variant="outline" onClick={ () => handleNavigate('/aplicaciones') }>
                    <CalendarDays size={20} strokeWidth={1.25} />
                    Ver aplicaciones
                </Button>
                <Button className="gap-2 w-full"  variant="outline" onClick={ () => handleNavigate('/staff') }>
                    <Users size={20} strokeWidth={1.25} />
                    Staffs
                </Button>
                <Button className="gap-2 w-full" onClick={ () => handleNavigate('/staff/nuevo') }>
                    <UserPlus size={20} strokeWidth={1.25}/>
                    Crear Nuevo staff
                </Button>
            </CardFooter>
        </Card>
    )
}
