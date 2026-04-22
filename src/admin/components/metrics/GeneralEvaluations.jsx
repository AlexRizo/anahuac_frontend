import { FileChartColumn, TrendingDown, TrendingUp, Users } from "lucide-react";
import { GeneralEvaluationCard } from "./GeneralEvaluationCard";

export const GeneralEvaluations = () => {
  return (
    <div className="grid grid-cols-4 gap-4 px-20">
      <GeneralEvaluationCard
        title="Promedio General"
        description="60 reactivos evaluados"
        percentage="80%"
        icon={FileChartColumn}
      />
      <GeneralEvaluationCard
        title="Aspirantes Evaluados"
        description="Total de evaluados para el análisis"
        percentage={200}
        icon={Users}
      />
      <GeneralEvaluationCard
        title="Reactivo con Mayor Acierto"
        description="C-21"
        percentage="80%"
        icon={TrendingUp}
        color="green"
      />
      <GeneralEvaluationCard
        title="Reactivo con Menor Acierto"
        description="C-32"
        percentage="85%"
        icon={TrendingDown}
        color="red"
      />
    </div>
  );
};
