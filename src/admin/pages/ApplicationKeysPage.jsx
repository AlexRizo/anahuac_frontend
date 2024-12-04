import { Button, Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui"
import { useAppStore, useKeysStore } from "@/hooks";
import { CalendarDays, CirclePlus, LoaderCircle, Printer, Users } from "lucide-react"
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { capitalizeFirstLetter, customParseISO } from "../helpers";
import { AddKeysDialog, KeysPDF } from "../components";
import { pdf } from "@react-pdf/renderer";

export const ApplicationKeysPage = () => {
    const { keys, total, startLoadingKeys } = useKeysStore();
    const { activeApplication:activeApp, startLoadActiveApplication } = useAppStore();
    const { id } = useParams();
    const navigate = useNavigate();

    const columns = 8;
    const emptyCells = columns - (keys.length % columns);

    useEffect(() => {
        startLoadingKeys(id);

        if (!activeApp) {
            startLoadActiveApplication(id);
        }
    }, []);

    const aRef = useRef(null);

    const handleDownloadPDF = async () => {
        const activeKeys = keys.filter(key => !key.used);

        if (!activeKeys.length) {
            return;
        }
        
        const document = <KeysPDF keys={ activeKeys } />

        const blob = await pdf(document).toBlob();
        const url = window.URL.createObjectURL(blob);

        aRef.current.href = url;
        aRef.current.download = `claves-activacion-${ activeApp.name }.pdf`;
        aRef.current.click();
    };
    
    return (
        <main className="w-full">
            <a ref={ aRef } target="_blank" rel="noopener noreferrer" className="hidden"></a>
            <div>
                <nav className="flex items-center gap-5 px-14 py-8">
                    <h1 className="text-3xl font-semibold">Aplicaciones</h1>
                    <p className="text-gray-400 pt-1"> / Claves de activación</p>
                </nav>
                <hr />
            </div>
            <div className="py-14 px-24">
                <div>
                    <div className="flex justify-between mb-4">
                        <h1 className="font-bold">Datos de la Aplicación</h1>
                        <AddKeysDialog>
                            <Button variant="outline" className="gap-2">
                                <CirclePlus size={18} strokeWidth={1.25} />
                                Crea claves adicionales
                            </Button>
                        </AddKeysDialog>
                    </div>

                    <Table>
                        {
                            !activeApp && (
                            <TableCaption>
                                <div className="flex items-center justify-center w-full overflow-hidden">
                                    <LoaderCircle size={20} className="animate-spin mr-1"/>
                                    <span className="text-gray-600">Cargando...</span>
                                </div>
                            </TableCaption>
                            )
                        }
                        <TableHeader>
                            <TableRow>
                            <TableHead>Tipo</TableHead>
                            <TableHead>ID</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Aplicador</TableHead>
                            <TableHead>Claves</TableHead>
                            </TableRow>
                        </TableHeader>
                        {
                            activeApp && (
                                <TableBody className="border-b">
                                    <TableRow>
                                        <TableCell>{ capitalizeFirstLetter(activeApp.origin) }</TableCell>
                                        <TableCell>{ activeApp.name }</TableCell>
                                        <TableCell>{ customParseISO(activeApp.date) }</TableCell>
                                        <TableCell>{ activeApp.admin.name }</TableCell>
                                        <TableCell>{ total }</TableCell>
                                    </TableRow>
                                </TableBody>
                            )
                        }
                    </Table>
                </div>

                <div>
                    <div className="flex justify-between mt-10 mb-6">
                        <h1 className="font-bold">Claves de Activación</h1>
                    </div>

                    <div>
                        <ul className="grid grid-cols-8">
                            {
                                keys.map(key => (
                                    <li className={`w-full border-b text-center py-4 ${ key.used && 'opacity-50 cursor-not-allowed' }`} key={ key.id }>
                                        { key.key }
                                    </li>
                                ))
                            }
                            {
                                Array.from({ length: emptyCells }).map((_, index) => (
                                    <li className="w-full border-b text-center" key={ `empty-${ index }` }>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-5 mt-32">
                    <Button variant="outline" onClick={ () => navigate('/aplicaciones') }>
                        <CalendarDays size={18} strokeWidth={1.25} className="mr-2"/>
                        Aplicaciones
                    </Button>
                    <Button variant="outline" onClick={ () => navigate('/aspirantes') }>
                        <Users size={18} strokeWidth={1.25} className="mr-2"/>
                        Aspirantes
                    </Button>
                    <Button onClick={ handleDownloadPDF } disabled={ keys.length === 0 }>
                        <Printer size={18} strokeWidth={1.25} className="mr-2"/>
                        Imprimir
                    </Button>
                </div>
            </div>
        </main>
    )
}
