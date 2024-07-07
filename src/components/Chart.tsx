import { LineChart, Line, Legend, Tooltip, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface ChartProps {
  data: { year: number; temperature_moyenne: number; temperature_maximum: number; temperature_minimum: number }[];
}

export const Chart: React.FC<ChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="year"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}°C`}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="temperature_moyenne"
          stroke="#1f77b4" // Utilisation d'une couleur hexadécimale valide
          fillOpacity={0.3}
        />
        <Line
          type="monotone"
          dataKey="temperature_maximum"
          stroke="#E00E0B" // Utilisation d'une couleur hexadécimale valide
          fillOpacity={0.3}
        />
        <Line
          type="monotone"
          dataKey="temperature_minimum"
          stroke="#2ca02c" // Utilisation d'une couleur hexadécimale valide
          fillOpacity={0.3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
