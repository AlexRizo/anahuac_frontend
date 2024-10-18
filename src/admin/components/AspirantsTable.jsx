import { useEffect, useMemo, useState } from "react";
import { Edit, LoaderCircle, Trash } from "lucide-react"
import { Label, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Button, Input, TableCaption } from "@/components/ui"
import { AlertDialogDelete } from ".";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter, customParseISO } from "../helpers";
import { useAspirantsStore } from "@/hooks/useAspirantsStore";

export const AspirantsTable = () => {
    // const { applications, startLoadingApps, startLoadingAppsByDate, startSetActiveApplication, isLoading } = useAppStore();
    const { aspirants, startLoadingAspirants, isLoading } = useAspirantsStore();

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const isLoadingAspirants = useMemo(() => isLoading === 'loading', [isLoading]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchApps = async () => {
            const pages = await startLoadingAspirants({ page });
            setTotalPages(pages);
        };

        fetchApps();
    }, [page]);

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
                    <Button>
                        <Trash size={20} strokeWidth={1.50} absoluteStrokeWidth className="mr-1" />
                        Eliminar
                    </Button>
                </div>
            </div>
            <div className="border rounded">
                <Table>
                    {
                        isLoadingAspirants && (
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
                            <TableHead>#</TableHead>
                            <TableHead>ID Aspirante</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Sexo</TableHead>
                            <TableHead>Escuela de origen</TableHead>
                            <TableHead>Fecha de nacimiento</TableHead>
                            <TableHead className="text-center">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            aspirants.map((aspirant, index) => (
                                <TableRow key={ aspirant.id }>
                                    <TableCell>{ index + 1 }</TableCell>
                                    <TableCell>{ aspirant.name }</TableCell>
                                    <TableCell>{ capitalizeFirstLetter(aspirant.sex) }</TableCell>
                                    <TableCell>{ customParseISO(aspirant.origin) }</TableCell>
                                    <TableCell>{ capitalizeFirstLetter(aspirant.date) }</TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center gap-5">
                                            <Edit 
                                                size={20} 
                                                absoluteStrokeWidth 
                                                strokeWidth={1.50}
                                                className="cursor-pointer hover:text-blue-500 transition"
                                                onClick={ () => {
                                                    startSetActiveApplication(aspirant.id);
                                                    handleNavigate(`/aspirantes/editar/${ aspirant.id }`)
                                                }}
                                            />
                                            <AlertDialogDelete mongoId={ aspirant.id } name={ aspirant.name }>
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
