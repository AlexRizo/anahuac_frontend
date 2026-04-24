import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { ProgressItem } from "./ProgressItem";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { calculatePercentageByBlock } from "@/admin/helpers/metrics";

export const PercentageByBlock = ({
  results = [],
  totals = { lectura: 0, matematicas: 0, pensamiento: 0 },
}) => {
  const percentageByBlock = useMemo(() => {
    if (!results.length || !totals) return;
    return calculatePercentageByBlock(results, totals);
  }, [results, totals]);

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
          reactives={totals?.lectura}
          percentage={percentageByBlock?.lectura?.porcentajeGlobal}
          interns={percentageByBlock?.lectura?.distribucionInternos}
          externs={percentageByBlock?.lectura?.distribucionExternos}
        />
        <ProgressItem
          block="Razonamiento Lógico-Matemático"
          reactives={totals?.matematicas}
          percentage={percentageByBlock?.matematicas?.porcentajeGlobal}
          interns={percentageByBlock?.matematicas?.distribucionInternos}
          externs={percentageByBlock?.matematicas?.distribucionExternos}
        />
        <ProgressItem
          block="Habilidades del Pensamiento"
          reactives={totals?.pensamiento}
          percentage={percentageByBlock?.pensamiento?.porcentajeGlobal}
          interns={percentageByBlock?.pensamiento?.distribucionInternos}
          externs={percentageByBlock?.pensamiento?.distribucionExternos}
        />
      </CardContent>
    </Card>
  );
};

PercentageByBlock.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      origin: PropTypes.string,
      lectura: PropTypes.number,
      pensamiento: PropTypes.number,
      matematicas: PropTypes.number,
    }),
  ),
  totals: PropTypes.shape({
    lectura: PropTypes.number,
    matematicas: PropTypes.number,
    pensamiento: PropTypes.number,
  }),
};
