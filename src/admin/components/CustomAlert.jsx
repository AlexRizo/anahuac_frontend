import { Alert, AlertDescription, AlertTitle } from "@/components/ui"
import { Rocket, TriangleAlert } from "lucide-react"

export const CustomAlert = ({ title, message, variant }) => {
    return (
        <Alert variant={ variant } className="mb-4 mt-1" >
            {
                variant === 'success'
                        ? <Rocket size={20} strokeWidth={1.25} absoluteStrokeWidth />
                        : <TriangleAlert size={20} strokeWidth={1.25} absoluteStrokeWidth />
            }
            <TriangleAlert size={20} strokeWidth={1.25} absoluteStrokeWidth />
            <AlertTitle>{ title }</AlertTitle>
            <AlertDescription>
                { message }
            </AlertDescription>
        </Alert>
    )
}
