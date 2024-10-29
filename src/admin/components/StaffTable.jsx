import { useEffect, useMemo, useState } from "react";
import { Edit, LoaderCircle, Trash, X } from "lucide-react"
import { Label, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Button, Input, TableCaption } from "@/components/ui"
import { AlertDialogDelete } from ".";
import { useNavigate } from "react-router-dom";
import { formatDateDMYHMS, parseAdminRole } from "../helpers";
import debounce from "lodash.debounce";
import { useAdminsStore } from "@/hooks";

export const StaffTable = () => {
    const { admins, startLoadingAdmins, startDeletingAdmin, startSetActiveAdmin, loading } = useAdminsStore();

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [searchedTerm, setSearchedTerm] = useState('');
    const [isFirstTime, setIsFirstTime] = useState(true);

    const isLoadingAdmins = useMemo(() => loading === 'loading', [loading]);

    const navigate = useNavigate();

    const handlePageChange = (page) => setPage(page);

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleSearch = (e) => {
        setSearchedTerm(e.target.value);
    };

    const handleCleanFilter = () => {
        if (searchedTerm === '') return;
        setSearchedTerm('');
    };

    useEffect(() => {
        const fetchAdmins = async (name = '') => {
            const pages = await startLoadingAdmins({ 
                page,
                name
            });
            setTotalPages(pages);
        };
        
        const debouncedSearch = debounce(async (term) => {
            if (term) {
                fetchAdmins(term);
            } else {
                fetchAdmins();
            }
        }, 500);

        if (isFirstTime) {
            fetchAdmins(searchedTerm);
            setIsFirstTime(false);
        } else {
            debouncedSearch(searchedTerm);
        }

        return () => debouncedSearch.cancel();
    }, [searchedTerm, page]);


    return (
        <>
            <div className="flex justify-between mb-5">
                <div className="flex gap-5">
                    <Input type="text" placeholder="Buscar staff..." className="transition w-[251px] shadow-sm" onChange={ handleSearch } value={ searchedTerm } />
                    <Button variant="ghost" onClick={ handleCleanFilter }>
                        <X size={20} strokeWidth={1.50} absoluteStrokeWidth className="mr-1" />
                        Limpiar filtro
                    </Button>
                </div>
            </div>
            <div className="border rounded">
                <Table>
                    {
                        isLoadingAdmins && (
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
                            <TableHead>Usuario</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Correo Electrónico</TableHead>
                            <TableHead>Perfil</TableHead>
                            <TableHead>Último Acceso</TableHead>
                            <TableHead className="text-center">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            admins.map((admin, index) => (
                                <TableRow key={ admin.id }>
                                    <TableCell>{ index + 1 }</TableCell>
                                    <TableCell>{ admin.username }</TableCell>
                                    <TableCell>{ `${ admin.first_name } ${ admin.last_name }` }</TableCell>
                                    <TableCell>{ admin.email }</TableCell>
                                    <TableCell>{ parseAdminRole(admin.role) }</TableCell>
                                    <TableCell>{ formatDateDMYHMS(admin.last_login) }</TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-center gap-5">
                                            <Edit 
                                                size={20} 
                                                absoluteStrokeWidth 
                                                strokeWidth={1.50}
                                                className="cursor-pointer hover:text-blue-500 transition"
                                                onClick={ () => {
                                                    startSetActiveAdmin(admin.id);
                                                    handleNavigate(`/staff/editar/${ admin.id }`)
                                                }}
                                            />
                                            <AlertDialogDelete
                                                title="¿Estás seguro?"
                                                description="¿Estás seguro de eliminar a este staff? Esta acción no se puede deshacer."
                                                additionalDescription="Las aplicaciones asociadas a este usuario no se eliminarán, pero seguirán siendo propiedad de él."
                                                confirm={ startDeletingAdmin }
                                                mongoId={ admin.id }
                                                name={ admin.username }
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
