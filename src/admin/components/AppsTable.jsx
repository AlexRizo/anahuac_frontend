import { useEffect } from "react";
import { Ban, Edit, Trash, User } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui"
import { useAppStore } from "@/hooks";

export const AppsTable = () => {
    const { applications, startLoadingApps } = useAppStore();

    useEffect(() => {
        startLoadingApps();
    }, []);

    return (
        <div className="border rounded">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[5%]" >#</TableHead>
                        <TableHead className="w-[15%]" >ID Aplicación</TableHead>
                        <TableHead className="w-[35%]" >Fecha de Aplicación</TableHead>
                        <TableHead className="w-[15%]" >Status</TableHead>
                        <TableHead className="w-[10%]" >Aplicador</TableHead>
                        <TableHead className="w-[10%] text-center" >Resultados</TableHead>
                        <TableHead className="w-[10%] text-center" >Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applications.map((app, index) => (
                            <TableRow>
                                <TableCell>{ index }</TableCell>
                                <TableCell>{ app.name }</TableCell>
                                <TableCell>{ app.date }</TableCell>
                                <TableCell>{ app.status }</TableCell>
                                <TableCell>
                                    <div className="flex">
                                        <User size={20} absoluteStrokeWidth strokeWidth={1.50} />
                                        Tere Ramos
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Ban className="m-auto" size={20} absoluteStrokeWidth strokeWidth={1.50}/>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-center gap-5">
                                        <Edit size={20} absoluteStrokeWidth strokeWidth={1.50} />
                                        <Trash size={20} absoluteStrokeWidth strokeWidth={1.50} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}
