import { FileChartColumn, TrendingDown, TrendingUp, Users } from "lucide-react";
import { GeneralEvaluationCard } from "./GeneralEvaluationCard";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { calculateGeneralPercentage } from "@/admin/helpers/metrics";

export const GeneralEvaluations = ({
  data = [],
  totals = {
    lectura: 0,
    matematicas: 0,
    pensamiento: 0,
  },
  topReactives = {
    mostAccertQuestion: undefined,
    leastAccertQuestion: undefined,
  },
}) => {
  const [totalPercentage, setTotalPercentage] = useState(0);

  useEffect(() => {
    setTotalPercentage(calculateGeneralPercentage(data, totals));
  }, [data, totals, topReactives]);

  return (
    <div className="grid grid-cols-4 gap-4 px-20">
      <GeneralEvaluationCard
        title="Promedio General"
        description={`${totals?.lectura + totals?.matematicas + totals?.pensamiento} reactivos evaluados`}
        percentage={`${totalPercentage}%`}
        icon={FileChartColumn}
      />
      <GeneralEvaluationCard
        title="Aspirantes Evaluados"
        description="Total de evaluados para el análisis"
        percentage={data?.length}
        icon={Users}
      />
      <GeneralEvaluationCard
        title="Reactivo con Mayor Acierto"
        description={`R-${topReactives.mostAccertQuestion?.questionNumber ?? 0}`}
        percentage={`${topReactives.mostAccertQuestion?.percentage ?? 0}%`}
        icon={TrendingUp}
        color="green"
      />
      <GeneralEvaluationCard
        title="Reactivo con Menor Acierto"
        description={`R-${topReactives.leastAccertQuestion?.questionNumber ?? 0}`}
        percentage={`${topReactives.leastAccertQuestion?.percentage ?? 0}%`}
        icon={TrendingDown}
        color="red"
      />
    </div>
  );
};

GeneralEvaluations.propTypes = {
  data: PropTypes.arrayOf(
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
  topReactives: PropTypes.shape({
    mostAccertQuestion: PropTypes.shape({
      _id: PropTypes.string,
      totalAccerts: PropTypes.number,
      questionNumber: PropTypes.number,
      block: PropTypes.string,
      percentage: PropTypes.number,
    }),
    leastAccertQuestion: PropTypes.shape({
      _id: PropTypes.string,
      totalAccerts: PropTypes.number,
      questionNumber: PropTypes.number,
      block: PropTypes.string,
      percentage: PropTypes.number,
    }),
  }),
};
