import { ResponsiveContainer, LineChart, Line } from "recharts";

interface ChartProps {
  data: any[];
  [key: string]: any;
}

export function Chart({ data, ...props }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} {...props} />
    </ResponsiveContainer>
  );
}