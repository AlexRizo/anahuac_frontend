import { Bar, BarChart, XAxis, YAxis } from "recharts";

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

const chartData = [
  { block: "Comprensión Lectora", intern: 60, extern: 40 },
  { block: "R. Lógico Matemático", intern: 80, extern: 20 },
  { block: "Habilidades del Pensamiento", intern: 52, extern: 48 },
  { block: "General", intern: 52, extern: 48 },
];

const chartConfig = {
  intern: {
    label: "Internos",
    color: "#f97316",
  },
  extern: {
    label: "Externos",
    color: "#3b82f6",
  },
};

export const GapByOrigins = () => {
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
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="block"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              label={{
                value: "Porcentaje",
                angle: -90,
                position: "insideLeft",
              }}
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
          <GapByOriginBlock block="Comprensión Lectora" gap={16} />
          <GapByOriginBlock block="Razonamiento Lógico-Matemático" gap={-4} />
          <GapByOriginBlock block="Habilidades del Pensamiento" gap={35} />
          <GapByOriginBlock block="General" gap={27} />
        </div>
      </CardContent>
    </Card>
  );
};
