import { Line } from "recharts";
import { Chart } from "@/components/ui/chart";

interface SparklineProps {
  className?: string;
  data?: { value: number }[];
}

const defaultData = [
  { value: 40 },
  { value: 30 },
  { value: 45 },
  { value: 50 },
  { value: 45 },
  { value: 60 }
];

export function Sparkline({ className, data = defaultData }: SparklineProps) {
  return (
    <div className={`h-8 w-16 ${className}`}>
      <Chart data={data}>
        <Line
          type="monotone"
          dataKey="value"
          stroke="currentColor"
          strokeWidth={1.5}
          dot={false}
        />
      </Chart>
    </div>
  );
}