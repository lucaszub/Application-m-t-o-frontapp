"use client"

import React from 'react';
import { Bar, Legend, BarChart, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface OverviewProps {
  data: { year: number; precipitations: number }[];
}

const chartConfig = {
  precipitations: {
    label: "Precipitations",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export const Overview: React.FC<OverviewProps> = ({ data }) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart data={data}>
        <XAxis
          dataKey="year"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="currentColor"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}mm`}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Legend />
        <Bar
          dataKey="precipitations"
          fill={chartConfig.precipitations.color}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
};
