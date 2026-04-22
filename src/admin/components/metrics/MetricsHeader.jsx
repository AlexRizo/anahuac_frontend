import { GraduationCap } from "lucide-react";

export const MetricsHeader = () => {
  return (
    <div className="flex items-center gap-2 border-b border-border py-5 px-20">
      <div className="bg-blue-800 size-12 rounded-lg flex items-center justify-center">
        <GraduationCap color="white" />
      </div>
      <article className="leading-none">
        <h1 className="text-2xl font-bold">
          Panel de estadísticas - Exámenes de admisión
        </h1>
        <p className="text-muted-foreground">
          Análisis de resultados de los reactivos.
        </p>
      </article>
    </div>
  );
};
