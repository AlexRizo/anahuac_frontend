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
                        <TableHead >#</TableHead>
                        <TableHead >ID Aplicación</TableHead>
                        <TableHead >Fecha de Aplicación</TableHead>
                        <TableHead >Status</TableHead>
                        <TableHead >Aplicador</TableHead>
                        <TableHead >Keys</TableHead>
                        <TableHead className="text-center" >Resultados</TableHead>
                        <TableHead className="text-center" >Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applications.map((app, index) => (
                            <TableRow key={ app.id }>
                                <TableCell>{ index + 1 }</TableCell>
                                <TableCell>{ app.name }</TableCell>
                                <TableCell>{ app.date }</TableCell>
                                <TableCell>{ app.status }</TableCell>
                                <TableCell className="flex gap-1">
                                        <User size={20} absoluteStrokeWidth strokeWidth={1.50} />
                                        <p className="truncate">
                                            { app.user.name }
                                        </p>
                                </TableCell>
                                <TableCell>keys</TableCell>
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
