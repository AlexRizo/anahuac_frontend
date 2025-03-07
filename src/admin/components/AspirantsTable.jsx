import { useEffect, useMemo, useState } from "react";
import { Edit, LoaderCircle, Trash, X } from "lucide-react"
import { Label, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Button, Input, TableCaption } from "@/components/ui"
import { AlertDialogDelete, SelectApp, SelectOrigin } from ".";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter, customParseISO } from "../helpers";
import { useAspirantsStore } from "@/hooks/useAspirantsStore";
import debounce from "lodash.debounce";

export const AspirantsTable = () => {
    const { aspirants, startLoadingAspirants, startDeleteAspirant, startSetActiveAspirant, startClearState, loading } = useAspirantsStore();

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [filterStatus, setFilterStatus] = useState([]);
    const [selectedApp, setSelectedApp] = useState('');
    const [searchedTerm, setSearchedTerm] = useState('');
    const [isFirstTime, setIsFirstTime] = useState(true);

    const isLoadingAspirants = useMemo(() => loading === 'loading', [loading]);

    const navigate = useNavigate();

    const handlePageChange = (page) => setPage(page);

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleSearch = (e) => {
        setSearchedTerm(e.target.value);
    };

    const handleCleanFilter = () => {
        if (filterStatus.length === 0 && selectedApp === '' && searchedTerm === '') return;
        
        setFilterStatus([]);
        setSelectedApp('');
        setSearchedTerm('');
    };

    useEffect(() => {
        if (isFirstTime) {
            startClearState();
            setIsFirstTime(false);
            return;
        }

        const fetchAspirants = async (name = '') => {
            const pages = await startLoadingAspirants({ 
                page,
                sec: filterStatus.includes('SECUNDARIA') ? 'SECUNDARIA' : '',
                prep: filterStatus.includes('PREPARATORIA') ? 'PREPARATORIA' : '',
                app: selectedApp,
                name
            });
            setTotalPages(pages);
        };
        
        const debouncedSearch = debounce( async(term) => {
            if (term) {
                fetchAspirants(term);
            } else {
                fetchAspirants();
            }
        }, 500);

        debouncedSearch(searchedTerm);

        return () => debouncedSearch.cancel();
    }, [searchedTerm, page, filterStatus, selectedApp]);


    return (
        <>
            <div className="flex justify-between mb-5">
                <div className="flex gap-5">
                    <Input type="text" placeholder="Buscar aspirante..." className="transition w-[251px] shadow-sm" onChange={ handleSearch } value={ searchedTerm } />
                    <SelectOrigin filterStatus={ filterStatus } setFilterStatus={ setFilterStatus } />
                    <SelectApp selectedApp={ selectedApp } setSelectedApp={ setSelectedApp } />
                    <Button variant="ghost" onClick={ handleCleanFilter }>
                        <X size={20} strokeWidth={1.50} absoluteStrokeWidth className="mr-1" />
                        Limpiar filtro
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
                            <TableHead className="hidden 2xl:block">#</TableHead>
                            <TableHead>ID Aspirante</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Sexo</TableHead>
                            <TableHead className="hidden 2xl:block">Escuela de origen</TableHead>
                            <TableHead>Fecha de nacimiento</TableHead>
                            <TableHead className="text-center">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            aspirants.map((aspirant, index) => (
                                <TableRow key={ aspirant.id }>
                                    <TableCell className="hidden 2xl:block">{ index + 1 }</TableCell>
                                    <TableCell>{ aspirant.aspirant_id }</TableCell>
                                    <TableCell>
                                        { 
                                            `
                                                ${ aspirant.first_name } 
                                                ${ aspirant.last_name_1 } 
                                                ${ aspirant.last_name_2 }
                                            `
                                        }
                                    </TableCell>
                                    <TableCell>{ capitalizeFirstLetter(aspirant.sex) }</TableCell>
                                    <TableCell className="hidden 2xl:block">{ aspirant.origin }</TableCell>
                                    <TableCell>{ customParseISO(aspirant.birthdate) }</TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center gap-5">
                                            <Edit 
                                                size={20} 
                                                absoluteStrokeWidth 
                                                strokeWidth={1.50}
                                                className="cursor-pointer hover:text-blue-500 transition"
                                                onClick={ () => {
                                                    startSetActiveAspirant(aspirant.id);
                                                    handleNavigate(`/aspirantes/editar/${ aspirant.id }`)
                                                }}
                                            />
                                            <AlertDialogDelete
                                                title="¿Estás seguro?"
                                                description="¿Estás seguro de eliminar a este aspirante? Esta acción no se puede deshacer."
                                                additionalDescription="También se eliminará la clave asociada a este aspirante y sus resultados."
                                                confirm={ startDeleteAspirant }
                                                mongoId={ aspirant.id }
                                                name={ aspirant.aspirant_id }
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
