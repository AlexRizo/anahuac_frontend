import { useAspirantsStore } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { localCustom } from "../helpers";
import { format } from "date-fns";
import { CalendarDays, UserPlus, Users } from "lucide-react";
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui";

export const AspirantConfirm = () => {
    const { activeAspirant:aspirant, startClearActiveAspirant } = useAspirantsStore();
    const navigate = useNavigate();
    
    const handleNavigate = (route) => {
        navigate(route);
    }
    
    return (
        <Card className="w-[627px] mt-10">
            <CardHeader>
                <CardTitle className="text-base">Datos del aspirante</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex border-b pb-4 pt-6">
                    <p className="w-full">Nombre</p>
                    <p className="w-full">{`${ aspirant.first_name } ${ aspirant.last_name_1 } ${ aspirant.last_name_2 }`}</p>
                </div>
                <div className="flex border-b pb-4 pt-6">
                    <p className="w-full">ID de usuario</p>
                    <p className="w-full">{ aspirant.aspirant_id }</p>
                </div>
                <div className="flex border-b pb-4 pt-6">
                    <p className="w-full">Fecha de nacimiento</p>
                    <p className="w-full">{ format(aspirant.birthdate, "dd 'de' MMMM 'del' yyyy", { locale: localCustom } ) }</p>
                </div>
                <div className="flex border-b pb-4 pt-6">
                    <p className="w-full">Fecha de aplicación</p>
                    <p className="w-full">{ format(aspirant.application.date, "dd 'de' MMMM 'del' yyyy", { locale: localCustom } ) }</p>
                </div>
            </CardContent>
            <CardFooter className="gap-2">
                <Button className="gap-2" variant="outline" onClick={() => handleNavigate('/aplicaciones') }>
                    <CalendarDays size={20} strokeWidth={1.25} />
                    Ver aplicaciones
                </Button>
                <Button className="gap-2"  variant="outline" onClick={() => handleNavigate('/aplicaciones/:id/aspirantes') }>
                    <Users size={20} strokeWidth={1.25} />
                    Aspirantes
                </Button>
                <Button className="gap-2" onClick={() => startClearActiveAspirant() }>
                    <UserPlus size={20} strokeWidth={1.25}/>
                    Crear Nuevo Aspirante
                </Button>
            </CardFooter>
        </Card>
    )
}
