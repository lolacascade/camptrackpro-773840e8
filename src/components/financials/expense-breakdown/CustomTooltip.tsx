import { Card } from "@/components/ui/card";
import { CustomTooltipProps } from "./types";

export function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Card className="bg-white p-2 shadow-lg rounded-lg border">
        <p className="font-medium">{data.category}</p>
        <p className="text-gray-600">${data.amount.toLocaleString()}</p>
        <p className="text-gray-500">{data.percentage}%</p>
      </Card>
    );
  }
  return null;
}