import { Link } from "react-router-dom"
import { ResultsTable } from "../components/ResultsTable"
import { Button } from "@/components/ui"
import { CirclePlus } from "lucide-react"

export const ResultsPage = () => {
    return (
        <main className="w-full">
        <div>
            <nav className="flex justify-between px-14 py-8">
                <h1 className="text-3xl font-semibold">Staff</h1>
                <Link to={'/staff/nuevo'}>
                    <Button className="gap-2">
                        <CirclePlus size={20} strokeWidth={1.25} absoluteStrokeWidth />
                        Nuevo staff
                    </Button>
                </Link>
            </nav>
            <hr />
        </div>
        <div className="px-14 py-6">
            <ResultsTable />
        </div>
    </main>
    )
}
