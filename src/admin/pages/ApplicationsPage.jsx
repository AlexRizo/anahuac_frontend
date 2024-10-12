import { Button, Input, Label } from "@/components/ui"
import { CirclePlus } from "lucide-react"
import { AppsTable, DatePicker } from "../components"
import { Link } from "react-router-dom"

export const ApplicationsPage = () => {
    return (
        <main className="w-full">
            <div>
                <nav className="flex justify-between px-14 py-8">
                    <h1 className="text-3xl font-semibold">Aplicaciones</h1>
                    <Link to={'/aplicaciones/nueva'}>
                        <Button className="gap-2">
                            <CirclePlus size={20} strokeWidth={1.25} absoluteStrokeWidth />
                            Nueva fecha
                        </Button>
                    </Link>
                </nav>
                <hr />
            </div>
            <div className="px-14 py-6">
                <div className="flex justify-between mb-5">
                    <div>
                        <Input type="text" placeholder="Buscar aplicación..." className="transition w-[251px] shadow-sm" />
                    </div>
                    <div>
                        <Label className="mr-5">Selecciona una fecha de aplicación de examen:</Label>
                        <DatePicker />
                    </div>
                </div>
                <AppsTable />
            </div>
        </main>
    )
}
