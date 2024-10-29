import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { AdminForm } from "../components"
import { useAdminsStore } from "@/hooks";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

export const StaffEdit = () => {
    const { id } = useParams();

    const { loading, message, activeAdmin, startUpdatingAdmin, startLoadingActiveAdmin } = useAdminsStore();

    const isLoadingData = useMemo(() => loading === 'loading', [loading]);

    useEffect(() => {
        if (!activeAdmin) {
            startLoadingActiveAdmin(id);
        }
    }, []);

    if (!activeAdmin) {
        return (
            <>
                <div className="flex items-center justify-center">
                    <LoaderCircle size={24} strokeWidth={1.25} absoluteStrokeWidth className="animate-spin" />
                    <h1>Cargando...</h1>
                </div>
            </>
        );

    }

    return (
        <Card className={`w-[500px] h-min flex flex-col justify-between shadow-sm ${ isLoadingData && 'opacity-60 pointer-events-none' }`} > 
            <CardHeader>
                <CardTitle>Registro de staff</CardTitle>
            </CardHeader>
            <CardContent>
                <AdminForm 
                    isLoadingData={ isLoadingData }
                    message={ message }
                    saveData={ startUpdatingAdmin }
                    id={ id }
                    defaultValues={{ password: '', ...activeAdmin }}
                />
            </CardContent>
        </Card>
    )
}
