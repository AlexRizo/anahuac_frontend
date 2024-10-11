import { Button } from "@/components/ui"
import { CirclePlus } from "lucide-react"

export const ApplicationsPage = () => {
    return (
        <main className="w-full">
            <div>
                <nav className="flex justify-between px-14 py-8">
                    <h1 className="text-3xl font-semibold">Aplicaciones</h1>
                    <Button className="gap-2">
                        <CirclePlus size={20} strokeWidth={1.25} absoluteStrokeWidth />
                        Nueva fecha
                    </Button>
                </nav>
                <hr />
            </div>
        </main>
    )
}
