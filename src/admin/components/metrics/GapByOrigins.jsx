import { Bar, BarChart, XAxis } from "recharts";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { GapByOriginBlock } from "./GapByOriginBlock";
import { useMemo } from "react";
import { calculatePercentageByBlock, getGap } from "@/admin/helpers/metrics";

const chartConfig = {
  intern: {
    label: "Internos %",
    color: "#f97316",
  },
  extern: {
    label: "Externos %",
    color: "#3b82f6",
  },
};

export const GapByOrigins = ({ results = [], totals = {} }) => {
  const percentageByBlock = useMemo(() => {
    if (!results.length || !totals) return;
    return calculatePercentageByBlock(results, totals);
  }, [results, totals]);

  const gapByOrigin = useMemo(() => {
    if (!results.length || !totals) return;
    return getGap(results, totals);
  }, [results, totals]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Brecha de Alumnos Internos vs Externos</CardTitle>
        <CardDescription>
          Comparativa de rendimiento entre alumnos internos y externos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-[2/0.8]">
          <BarChart
            accessibilityLayer
            data={[
              {
                block: "Comprensión Lectora",
                intern: percentageByBlock?.lectura?.distribucionInternos,
                extern: percentageByBlock?.lectura?.distribucionExternos,
              },
              {
                block: "R. Lógico Matemático",
                intern: percentageByBlock?.matematicas?.distribucionInternos,
                extern: percentageByBlock?.matematicas?.distribucionExternos,
              },
              {
                block: "Habilidades del Pensamiento",
                intern: percentageByBlock?.pensamiento?.distribucionInternos,
                extern: percentageByBlock?.pensamiento?.distribucionExternos,
              },
              {
                block: "General",
                intern: percentageByBlock?.global?.distribucionInternos,
                extern: percentageByBlock?.global?.distribucionExternos,
              },
            ]}
          >
            <XAxis
              dataKey="block"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Bar
              dataKey="extern"
              stackId="a"
              fill="#3b82f6"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="intern"
              stackId="a"
              fill="#f97316"
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={false}
              defaultIndex={1}
            />
          </BarChart>
        </ChartContainer>
        <div className="flex flex-row justify-center gap-4 mt-2">
          <p className="text-sm flex items-center">
            <span className="inline-flex size-4 bg-orange-500 mr-1.5"></span>
            Internos
          </p>
          <p className="text-sm flex items-center">
            <span className="inline-flex size-4 bg-blue-500 mr-1.5"></span>
            Externos
          </p>
        </div>
        <div className="flex flex-col divide-y border-t pt-1 mt-4">
          <GapByOriginBlock
            block="Comprensión Lectora"
            gap={gapByOrigin?.lectura}
          />
          <GapByOriginBlock
            block="Razonamiento Lógico-Matemático"
            gap={gapByOrigin?.matematicas}
          />
          <GapByOriginBlock
            block="Habilidades del Pensamiento"
            gap={gapByOrigin?.pensamiento}
          />
          <GapByOriginBlock block="General" gap={gapByOrigin?.general} />
        </div>
      </CardContent>
    </Card>
  );
};

GapByOrigins.propTypes = {
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
