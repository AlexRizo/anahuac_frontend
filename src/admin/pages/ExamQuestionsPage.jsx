import { QuestionsTable } from "../components"

export const ExamQuestionsPage = () => {
    return (
        <main className="w-full">
        <div>
            <nav className="flex items-center gap-5 px-14 py-8">
                <h1 className="text-3xl font-semibold">Exámenes</h1>
                <p className="text-gray-400 pt-1">/ Contenido examen <strong>PREPARATORIA</strong></p>
            </nav>
            <hr />
        </div>
        <div className="px-14 py-6">
            <QuestionsTable />
        </div>
    </main>
    )
}
