import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui"

export const LecturaCard = ({ children, number, title, author, content = [], contentOrigin }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger>{ children }</AlertDialogTrigger>
            <AlertDialogContent className="max-w-xl">
                <AlertDialogHeader>
                    <AlertDialogTitle className="px-5 text-2xl">Lectura #{ number }</AlertDialogTitle>
                    <AlertDialogDescription className="max-h-[calc(100vh-20vh)] overflow-y-scroll custom-scrollbar px-5 flex flex-col">
                        <span className="text-3xl text-black font-bold mt-5 italic">{ title }</span>
                        <span className="text-xl text-black font-bold mt-2 mb-5 italic">{ author }</span>
                        <span>
                            {
                                content.map((paragraph, index) => <span key={ index }>{ paragraph }<br/><br/></span>)    
                            }
                        </span>
                        <span>{ contentOrigin }</span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction >Cerrar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
