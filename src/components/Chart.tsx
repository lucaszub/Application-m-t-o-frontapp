"use client"

import { LineChart, Line, Legend, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


interface ChartProps {
  data: { year: number; temperature_moyenne: number; temperature_maximum: number; temperature_minimum: number }[];
}

const chartConfig = {
  temperature_maximum: {
    label: "Temperature Maximum",
    color: "hsl(var(--chart-2))",
  },
  temperature_minimum: {
    label: "Temperature Minimum",
    color: "hsl(var(--chart-5))",
  },
  temperature_moyenne: {
    label: "Temperature Moyenne",
    color: "hsl(var(--chart-1))",
    
  },
} satisfies ChartConfig

export const Chart: React.FC<ChartProps> = ({ data }) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <LineChart data={data}>
        <XAxis
          dataKey="year"
          tickLine={false}
          fontSize={12}
          tickMargin={8}
          axisLine={false}
          tickFormatter={(value) => value.toString().slice(0, 4)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <YAxis
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}°C`}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="temperature_moyenne"
          stroke={chartConfig.temperature_moyenne.color}
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="temperature_maximum"
          stroke={chartConfig.temperature_maximum.color}
          fillOpacity={0.3}
        />
        <Line
          type="monotone"
          dataKey="temperature_minimum"
          stroke={chartConfig.temperature_minimum.color}
          fillOpacity={0.3}
        />
      </LineChart>
    </ChartContainer>
  );
};
