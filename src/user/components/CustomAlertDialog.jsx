import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button } from "@/components/ui"

export const CustomAlertDialog = ({ children, title, content }) => {
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
                    onClick={() => navigate("/examen/exap-matematicas")}
                >
                    Finalizar bloque
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    )
}
