import { Line } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

interface SparklineProps {
  className?: string;
}

export function Sparkline({ className }: SparklineProps) {
  // Sample data - in production this would come from props
  const data = [
    { value: 40 },
    { value: 30 },
    { value: 45 },
    { value: 50 },
    { value: 55 },
    { value: 45 },
    { value: 60 }
  ];

  return (
    <div className={`h-8 w-16 ${className}`}>
      <ChartContainer config={{}} data={data}>
        <Line
          type="monotone"
          dataKey="value"
          stroke="currentColor"
          strokeWidth={1.5}
          dot={false}
        />
      </ChartContainer>
    </div>
  );
}