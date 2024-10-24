import { useEffect, useMemo, useState } from "react";
import { Ban, Edit, KeyRound, LoaderCircle, Trash, User } from "lucide-react"
import { Label, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Button, Input, TableCaption } from "@/components/ui"
import { useAppStore } from "@/hooks";
import { AlertDialogDelete, DatePicker } from "./";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter, customParseISO } from "../helpers";

export const AppsTable = () => {
    const {
        applications,
        startDeleteApp,
        startLoadingApps,
        startLoadingAppsByDate,
        startSetActiveApplication,
        isLoading,
    } = useAppStore();

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [date, setDate] = useState({ from: null, to: null });
    const isLoadingApp = useMemo(() => isLoading === 'loading', [isLoading]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchApps = async () => {
            const pages = await startLoadingApps({ page });
            setTotalPages(pages);
        };

        const fetchAppsByDate = async () => {
            const pages = await startLoadingAppsByDate({ page, from: date.from, to: date.to });
            setTotalPages(pages);
        };

        if (date?.from && date?.to) {
            fetchAppsByDate();
        } else {
            fetchApps();
        }
    }, [page, date]);

    const handlePageChange = (page) => setPage(page);

    const handleNavigate = (path) => {
        navigate(path);
    };

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
                    {
                        isLoadingApp && (
                            <TableCaption>
                                <div className="flex items-center justify-center w-full overflow-hidden mb-4">
                                    <LoaderCircle size={20} className="animate-spin mr-1"/>
                                    <span className="text-gray-600">Cargando...</span>
                                </div>
                            </TableCaption>
                        )
                    }
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
                                    <TableCell>{ capitalizeFirstLetter(app.origin) }</TableCell>
                                    <TableCell>{ customParseISO(app.date) }</TableCell>
                                    <TableCell>{ capitalizeFirstLetter(app.status) }</TableCell>
                                    <TableCell className="flex gap-1">
                                            <User size={20} absoluteStrokeWidth strokeWidth={1.50} />
                                            <p className="truncate">
                                                { app.user.name }
                                            </p>
                                    </TableCell>
                                    <TableCell>
                                        <KeyRound
                                            strokeWidth={1.25}
                                            className="m-auto cursor-pointer hover:text-orange-500 transition"
                                            onClick={ () => {
                                                startSetActiveApplication(app.id);
                                                handleNavigate(`/aplicaciones/${ app.id }/claves`)
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Ban className="m-auto" size={20} absoluteStrokeWidth strokeWidth={1.50}/>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center gap-5">
                                            <Edit 
                                                size={20} 
                                                absoluteStrokeWidth 
                                                strokeWidth={1.50}
                                                className="cursor-pointer hover:text-blue-500 transition"
                                                onClick={ () => {
                                                    startSetActiveApplication(app.id);
                                                    handleNavigate(`/aplicaciones/editar/${ app.id }`)
                                                }}
                                            />
                                            <AlertDialogDelete
                                                title="¿Estás seguro?"
                                                description="Esta acción no se puede deshacer. ¿Estás seguro de eliminar esta aplicación?"
                                                confirm={ startDeleteApp }
                                                mongoId={ app.id }
                                                name={ app.name }
                                            >
                                                <Trash 
                                                    size={20} 
                                                    absoluteStrokeWidth 
                                                    strokeWidth={1.50}
                                                    className="cursor-pointer hover:text-red-600 transition"
                                                />
                                            </AlertDialogDelete>
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
