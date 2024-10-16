import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui"
import { useAppStore } from "@/hooks";

export const AlertDialogDelete = ({ children, mongoId, name }) => {
    const { startDeleteApp } = useAppStore();
    
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
            { children }
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer, y la 
                        aplicación se eliminará de forma permanente.
                        <br />
                        <br />
                        <strong>
                            Aplicación: { name }
                        </strong>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction 
                        className="bg-destructive hover:bg-red-600"
                        onClick={ () => startDeleteApp({ id: mongoId, name }) }
                    >
                        Eliminar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
