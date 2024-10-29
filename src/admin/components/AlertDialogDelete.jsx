import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui"

export const AlertDialogDelete = ({ children, mongoId, name, title, description, additionalDescription, confirm = () => {} }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
            { children }
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{ title }</AlertDialogTitle>
                    <AlertDialogDescription>
                        { description }
                        <br />
                        <br />  
                        {
                            additionalDescription && (
                                <>
                                    { additionalDescription }
                                    <br />
                                    <br />
                                </>
                            )
                        }
                        <strong>
                            Elemento: { name }
                        </strong>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction 
                        className="bg-destructive hover:bg-red-600"
                        onClick={ () => confirm({ id: mongoId, name }) }
                    >
                        Eliminar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
