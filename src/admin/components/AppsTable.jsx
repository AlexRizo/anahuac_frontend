import { useEffect, useState } from "react";
import { Ban, Edit, KeyRound, Trash, User } from "lucide-react"
import { Label, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Button, Input } from "@/components/ui"
import { useAppStore } from "@/hooks";
import { DatePicker } from ".";

export const AppsTable = () => {
    const { applications, startLoadingApps, startLoadingAppsByDate } = useAppStore();

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [date, setDate] = useState({ from: null, to: null });

    useEffect(() => {
        const fetchApps = async () => {
            const pages = await startLoadingApps({ page });
            setTotalPages(pages);
        };

        const fetchAppsByDate = async () => {
            const pages = await startLoadingAppsByDate({ page, from: date.from, to: date.to });
            setTotalPages(pages);
        };

        console.log({date});
        
        if (date?.from && date?.to) {
            fetchAppsByDate();
        } else {
            fetchApps();
        }
    }, [page, date]);

    const handlePageChange = (page) => setPage(page);

    return (
        <>
            <div className="flex justify-between mb-5">
                <div>
                    <Input type="text" placeholder="Buscar aplicación..." className="transition w-[251px] shadow-sm" />
                </div>
                <div>
                    <Label className="mr-5">Selecciona una fecha de aplicación de examen:</Label>
                    <DatePicker date={ date } setDate={ setDate } />
                </div>
            </div>
            <div className="border rounded">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead >#</TableHead>
                            <TableHead >ID Aplicación</TableHead>
                            <TableHead >Tipo</TableHead>
                            <TableHead >Fecha de Aplicación</TableHead>
                            <TableHead >Status</TableHead>
                            <TableHead >Aplicador</TableHead>
                            <TableHead className="text-center" >Claves</TableHead>
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
                                    <TableCell>{ app.origin }</TableCell>
                                    <TableCell>{ app.date }</TableCell>
                                    <TableCell>{ app.status }</TableCell>
                                    <TableCell className="flex gap-1">
                                            <User size={20} absoluteStrokeWidth strokeWidth={1.50} />
                                            <p className="truncate">
                                                { app.user.name }
                                            </p>
                                    </TableCell>
                                    <TableCell>
                                        <KeyRound strokeWidth={1.25} className="m-auto" />
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
            <div className="mt-5 ml-auto w-max">
                <div className="items-center gap-2 hidden">
                    <Label>Filas por página</Label>
                    <Select>
                        <SelectTrigger className="transition w-16">
                            <SelectValue placeholder="10" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-4">
                    Página { page } de { totalPages }
                    <Button 
                        variant="outline"
                        onClick={ () => handlePageChange(page - 1) }
                        disabled={ page === 1 }
                    >
                        { "<" }
                    </Button>
                    <Button 
                        variant="outline"
                        onClick={ () => handlePageChange(page + 1) }
                        disabled={ page === totalPages }
                    >
                        { ">" }
                    </Button>
                </div>
            </div>
        </>
    )
}
