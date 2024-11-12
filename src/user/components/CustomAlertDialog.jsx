import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button } from "@/components/ui"

export const CustomAlertDialog = ({ children, title, content, onConfirm = () => {} }) => {
    
    return (
        <AlertDialog>
        <AlertDialogTrigger asChild>
            { children }
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{ title }</AlertDialogTitle>
                <AlertDialogDescription>
                    { content }
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                    onClick={ () => onConfirm() }
                >
                    Finalizar bloque
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    )
}
