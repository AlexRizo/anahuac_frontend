import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui"
import { useNavigate } from "react-router-dom"

export const CardOption = ({title, description, icon, button, iconButton, path = '',}) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        if (path) return navigate(path);
    };
    
    return (
        <Card className="w-[280px] 2xl:w-[300px] flex flex-col justify-between shadow-sm" > 
            <CardHeader>
                <CardTitle>{ title }</CardTitle>
                <CardDescription>{ description }</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center">
                    { icon }
                </div>
            </CardContent>
            <CardFooter>
                <Button className="gap-2 2xl:w-[70%] m-auto" onClick={ handleNavigate } >
                    { iconButton }
                    { button }
                </Button>
            </CardFooter>
        </Card>
    )
}
