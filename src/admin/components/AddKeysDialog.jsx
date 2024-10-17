import { useMemo, useState } from "react";
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTrigger, Input, Label } from "@/components/ui"
import { CircleMinus, CirclePlus, LoaderCircle } from "lucide-react";
import { useKeysStore } from "@/hooks";
import { useParams } from "react-router-dom";
import { DialogTitle } from "@radix-ui/react-dialog";

export const AddKeysDialog = ({ children }) => {
    const { startAddKeys, isLoading } = useKeysStore();
    const { id } = useParams();
    const [keys, setKeys] = useState(1);

    const isLoadingKeys = useMemo(() => isLoading === 'loading', [isLoading]);

    const handleManualChange = (e) => {
        if (e.target.value > 25) return setKeys(25);
        if (e.target.value < 1) return setKeys(1);
        setKeys(e.target.value);
    }

    const handleChangue = (type) => {        
        if (type === 'plus') {
            if (keys === 25) return 25; 
            setKeys(keys + 1);
        } else {
            if (keys === 1) return 1;
            setKeys(keys - 1);
        }
    }
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                { children }
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] p-7">
                <DialogTitle></DialogTitle>
                <DialogDescription className="flex">
                    Es recomendable crear únicamente la cantidad de llaves 
                    que usarás para evitar la generación de claves innecesarias.
                </DialogDescription>
                <div className="py-2">
                    <div className="flex gap-4 items-center">
                        <Label htmlFor="keys" className="text-right">
                            Agregar claves de activación
                        </Label>
                        <CirclePlus strokeWidth={1.50} onClick={() => handleChangue('plus')} className="cursor-pointer"/>
                        <Input id="keys" value={ keys } onChange={ handleManualChange } type="number" className="w-14 button-number-decoration" />
                        <CircleMinus strokeWidth={1.50} onClick={() => handleChangue()} className="cursor-pointer"/>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">
                        Sólo se permiten crear 25 claves en lote.
                    </p>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button onClick={ () => startAddKeys(id, keys) } disabled={ isLoadingKeys }>
                        { 
                            isLoadingKeys ? (
                                <>
                                    <LoaderCircle size={20} className="animate-spin mr-1"/>
                                    Creando...
                                </>
                            ) : 'Crear'
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
