import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { ProgressItem } from "./ProgressItem";

export const PercentageByBlock = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Porcentaje de Aciertos por Bloque</CardTitle>
        <CardDescription>
          Rendimiento promedio en cada sección del examen
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <ProgressItem
          block="Comprensión Lectora"
          reactives={20}
          percentage={71}
        />
        <ProgressItem
          block="Razonamiento Lógico-Matemático"
          reactives={20}
          percentage={80}
        />
        <ProgressItem
          block="Habilidades del Pensamiento"
          reactives={20}
          percentage={60}
        />
      </CardContent>
    </Card>
  );
};
