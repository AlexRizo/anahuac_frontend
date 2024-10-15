import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui"

export const ApplicationConfirm = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Datos de la aplicación</CardTitle>
            </CardHeader>
            <CardContent>
                <div>
                    <p>TIPO</p>
                    <p>Aplicación Preparatoria</p>
                </div>
                <div>
                    <p>ID de aplicación</p>
                    <p>EAP04</p>
                </div>
                <div>
                    <p>Fecha de aplicación</p>
                    <p>23 de noviembre 2024</p>
                </div>
                <div>
                    <p>Aplicador</p>
                    <p>Tere Reyes</p>
                </div>
                <div>
                    <p>Claves de aspirantes</p>
                    <p>35</p>
                </div>
            </CardContent>
            <CardFooter>
                <Button>
                    Ver aplicaciones
                </Button>
                <Button>
                    Aspirantes
                </Button>
                <Button>
                    Claves de activación
                </Button>
            </CardFooter>
        </Card>
    )
}
