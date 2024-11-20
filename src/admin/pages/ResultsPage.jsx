import { ResultsTable } from "../components/ResultsTable"

export const ResultsPage = () => {
    return (
        <main className="w-full">
        <div>
            <nav className="flex justify-between px-14 py-8">
                <h1 className="text-3xl font-semibold">Resultados</h1>
            </nav>
            <hr />
        </div>
        <div className="px-14 py-6">
            <ResultsTable />
        </div>
    </main>
    )
}
