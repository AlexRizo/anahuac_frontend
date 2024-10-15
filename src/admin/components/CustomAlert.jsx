import { Alert, AlertDescription, AlertTitle } from "@/components/ui"
import { TriangleAlert } from "lucide-react"

export const CustomAlert = ({ message, variant }) => {
    return (
        <Alert variant={ variant } className="mb-4 mt-1" >
            <TriangleAlert size={20} strokeWidth={1.25} absoluteStrokeWidth />
            <AlertTitle>Ha ocurrido un error</AlertTitle>
            <AlertDescription>
                { message }
            </AlertDescription>
        </Alert>
    )
}
