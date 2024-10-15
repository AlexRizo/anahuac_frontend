import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui"
import { useAppStore } from "@/hooks";
import { CalendarDays, KeyRound, UserPlus } from "lucide-react";
import { CustomAlert } from "../components";
import { useNavigate } from "react-router-dom";

export const ApplicationConfirm = () => {
    const { activeApplication:app } = useAppStore();
    const navigate = useNavigate();
    
    const handleNavigate = (route) => {
        navigate(route);
    }
    
    return (
        <div>
            <CustomAlert
                title="Nueva aplicación creada"
                message={`Se ha creado una nueva fecha de examen de admisión exitosamente.`}
                variant="success"
            />
        
            <Card className="w-[627px] mt-10">
                <CardHeader>
                    <CardTitle className="text-base">Datos de la aplicación</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex border-b pb-4 pt-6">
                        <p className="w-full">TIPO</p>
                        <p className="w-full">Aplicación { app.origin }</p>
                    </div>
                    <div className="flex border-b pb-4 pt-6">
                        <p className="w-full">ID de aplicación</p>
                        <p className="w-full">{ app.name }</p>
                    </div>
                    <div className="flex border-b pb-4 pt-6">
                        <p className="w-full">Fecha de aplicación</p>
                        <p className="w-full">{ app.date }</p>
                    </div>
                    <div className="flex border-b pb-4 pt-6">
                        <p className="w-full">Aplicador</p>
                        <p className="w-full">{ app.user.name }</p>
                    </div>
                    <div className="flex border-b pb-4 pt-6">
                        <p className="w-full">Claves de aspirantes</p>
                        <p className="w-full">35</p>
                    </div>
                </CardContent>
                <CardFooter className="gap-2">
                    <Button className="gap-2" variant="outline" onClick={() => handleNavigate('/aplicaciones') }>
                        <CalendarDays size={20} strokeWidth={1.25} />
                        Ver aplicaciones
                    </Button>
                    <Button className="gap-2"  variant="outline" onClick={() => handleNavigate('/aplicaciones/:id/aspirantes') }>
                        <UserPlus size={20} strokeWidth={1.25} />
                        Aspirantes
                    </Button>
                    <Button className="gap-2" onClick={() => handleNavigate('/aplicaciones/:id/claves') }>
                        <KeyRound size={20} strokeWidth={1.25}/>
                        Claves de activación
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
