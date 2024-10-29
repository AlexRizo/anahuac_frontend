import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { AdminForm } from "../components";
import { useAdminsStore } from "@/hooks";
import { useMemo } from "react";

export const StaffAdd = () => {
    const { loading, message, startSavingAdmin } = useAdminsStore();

    const isLoadingData = useMemo(() => loading === 'loading', [loading]);

    return (
        <Card className={`w-[500px] h-min flex flex-col justify-between shadow-sm ${ isLoadingData && 'opacity-60 pointer-events-none' }`} > 
            <CardHeader>
                <CardTitle>Registro de staff</CardTitle>
            </CardHeader>
            <CardContent>
                <AdminForm isLoadingData={ isLoadingData } message={ message } saveData={ startSavingAdmin } />
            </CardContent>
        </Card>
    )
}
