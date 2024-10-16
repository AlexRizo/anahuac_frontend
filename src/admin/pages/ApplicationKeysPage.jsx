import { Button, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui"
import { useKeysStore } from "@/hooks";
import { CirclePlus } from "lucide-react"
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const ApplicationKeysPage = () => {
    const { keys, total, isLoading, startLoadingKeys } = useKeysStore();
    const { id } = useParams();

    useEffect(() => {
        startLoadingKeys(id);
    }, []);
    
    return (
        <main className="w-full">
            <div>
                <nav className="flex items-center gap-5 px-14 py-8">
                    <h1 className="text-3xl font-semibold">Aplicaciones</h1>
                    <p className="text-gray-400 pt-1"> / Claves de activación</p>
                </nav>
                <hr />
            </div>
            <div className="py-14 px-24">
                <div className="flex justify-between">
                    <h1 className="font-bold">Datos de la Aplicación</h1>
                    <Button variant="outline" className="gap-2">
                        <CirclePlus size={18} strokeWidth={1.25} />
                        Crea claves adicionales
                    </Button>
                </div>
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {keys.map((key) => (
                        <TableRow key={key.id}>
                            <TableCell className="font-medium">{key.key}</TableCell>
                            <TableCell>{key.key}</TableCell>
                            <TableCell>{key.key}</TableCell>
                            <TableCell className="text-right">{key.key}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">{ total }</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </main>
    )
}
