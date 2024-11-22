import { Button, Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui"
import { useExamStore } from "@/hooks";
import { FolderOpen, LoaderCircle } from "lucide-react"
import { useEffect, useMemo } from "react";
import { NavLink } from "react-router-dom";

export const ExamsTable = () => {

    const { startLoadingExams, exams, isLoading } = useExamStore();

    const isLoadingApp = useMemo(() => isLoading === 'loading', [isLoading]);

    useEffect(() => {
        if (!exams) return;
        startLoadingExams();
    }, []);
    
    return (
        <div className="border rounded-md">
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
                        <TableHead>ID Examen</TableHead>
                        <TableHead>Plantel</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead className="text-center">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        exams?.map((exam, index) => (
                            <TableRow key={ index }>
                                <TableCell className="font-medium">{ exam.exam_id }</TableCell>
                                <TableCell className="font-medium lowercase first-letter:uppercase">{ exam.origin }</TableCell>
                                <TableCell>{ exam.name }</TableCell>
                                <TableCell className="text-center">
                                    <NavLink to={ `/examenes/${ exam.id }/preguntas` }>
                                        <Button variant="outline" className="border-0">
                                            <FolderOpen size={ 18 } />
                                        </Button>
                                    </NavLink>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}
