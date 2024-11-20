import { useEffect, useMemo, useState } from "react";
import { CheckCircle, CircleX, Edit, FileBadge, LoaderCircle, Trash, X } from "lucide-react"
import { Label, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Button, Input, TableCaption } from "@/components/ui"
import { AlertDialogDelete, SelectApp, SelectOrigin } from ".";
import { useNavigate } from "react-router-dom";
import { useAspirantsStore } from "@/hooks/useAspirantsStore";
import debounce from "lodash.debounce";

export const ResultsTable = () => {
    const { aspirants, startLoadingAspirants, startDeleteAspirant, startSetActiveAspirant, loading } = useAspirantsStore();

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
        const fetchAspirants = async (name = '') => {
            const pages = await startLoadingAspirants({ 
                page,
                sec: filterStatus.includes('SECUNDARIA') ? 'SECUNDARIA' : '',
                prep: filterStatus.includes('PREPARATORIA') ? 'PREPARATORIA' : '',
                app: selectedApp,
                name,
                results: true
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

        if (isFirstTime) {
            fetchAspirants(searchedTerm);
            setIsFirstTime(false);
        } else {
            debouncedSearch(searchedTerm);
        }

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
                            <TableHead>#</TableHead>
                            <TableHead>ID Aspirante</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead className="text-center">C. Lect.</TableHead>
                            <TableHead className="text-center">H. Mat.</TableHead>
                            <TableHead className="text-center">H. Mental</TableHead>
                            <TableHead className="text-center">Total</TableHead>
                            <TableHead className="text-center">Admisión</TableHead>
                            <TableHead className="text-center">Documento</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            aspirants.map((aspirant, index) => (
                                <TableRow key={ aspirant.id }>
                                    <TableCell>{ index + 1 }</TableCell>
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
                                    <TableCell className="text-center">{ aspirant?.examResult?.lecturaScore ?? 0 }</TableCell>
                                    <TableCell className="text-center">{ aspirant?.examResult?.matematicasScore ?? 0 }</TableCell>
                                    <TableCell className="text-center">{ aspirant?.examResult?.pensamientoScore ?? 0 }</TableCell>
                                    <TableCell className="text-center">{ 
                                        aspirant?.examResult?.lecturaScore + aspirant?.examResult?.matematicasScore + aspirant?.examResult?.pensamientoScore ?? 0 
                                    }</TableCell>
                                    <TableCell>
                                        <div className="flex justify-center">
                                            {
                                               aspirant?.examResult?.lecturaScore + aspirant?.examResult?.matematicasScore + aspirant?.examResult?.pensamientoScore > 999 
                                               ? <CheckCircle strokeWidth={ 1.25 } /> : <CircleX strokeWidth={ 1.25 } />
                                            }
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-center">
                                            <FileBadge strokeWidth={ 1.25 } />
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
