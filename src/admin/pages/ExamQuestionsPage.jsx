import { useEffect, useState } from "react";
import { QuestionsTable } from "../components"
import { useExamStore } from "@/hooks/useExamStore";
import { useParams } from "react-router-dom";

export const ExamQuestionsPage = () => {
    const { startLoadingAllQuestionsWithCorrectAnswer } = useExamStore();
    const { id } = useParams();
    
    const [ exam ] = useState(id === '6712e526aa2479c2a9e3d3b4' ? 'SECUNDARIA' : 'PREPARATORIA');
    
    useEffect(() => {
        startLoadingAllQuestionsWithCorrectAnswer(id);
        console.log(exam);
    }, []);
    
    return (
        <main className="w-full">
            <div>
                <nav className="flex items-center gap-5 px-14 py-5 2xl:py-8">
                    <h1 className="text-2xl 2xl:text-3xl font-semibold">Exámenes</h1>
                    <p className="text-gray-400 pt-1">/ Contenido examenaasdasdasdasdsa <strong>{ exam }</strong></p>
                </nav>
                <hr />
            </div>
            <div className="px-14 py-6">
                <QuestionsTable />
            </div>
        </main>
    )
}
