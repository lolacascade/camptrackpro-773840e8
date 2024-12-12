import { Line, LineChart, ResponsiveContainer } from "recharts";

interface SparklineProps {
  className?: string;
  data?: { value: number }[];
  height?: number;
}

const defaultData = [
  { value: 40 },
  { value: 30 },
  { value: 45 },
  { value: 50 },
  { value: 45 },
  { value: 60 },
  { value: 55 },
  { value: 65 },
  { value: 75 },
  { value: 70 },
  { value: 80 }
];

export function Sparkline({ className, data = defaultData, height = 40 }: SparklineProps) {
  return (
    <div className={`w-24 ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="currentColor"
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}