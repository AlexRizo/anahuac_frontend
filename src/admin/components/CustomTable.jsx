import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui"
import { Ban, Edit, Trash, User } from "lucide-react"

export const CustomTable = () => {
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
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>EAP-04-241123</TableCell>
                        <TableCell>Aplicación del 23 de noviembre de 2024</TableCell>
                        <TableCell>Programada</TableCell>
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
                </TableBody>
            </Table>
        </div>
    )
}
