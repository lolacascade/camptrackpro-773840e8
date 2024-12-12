import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ChartTooltipProps } from "./types";

export function ChartTooltip({ active, payload, label, trends }: ChartTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const item = payload[0].payload;
  const trend = trends[`${item.month}-${item.year}`];

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border text-sm">
      <p className="font-bold text-[#133134] mb-2">
        {`${label} ${item.year}`}
        {item.isProjected && " (Projected)"}
      </p>
      {payload.map((entry, index) => (
        <p key={index} className="text-[#133134] flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full inline-block`} 
            style={{ backgroundColor: entry.color }} />
          {`${entry.name}: $${entry.value.toLocaleString()}`}
        </p>
      ))}
      {trend && (
        <p className={cn(
          "mt-2",
          trend.change >= 0 ? "text-green-600" : "text-red-600"
        )}>
          {trend.change >= 0 ? '↑' : '↓'} {Math.abs(trend.change)}% vs previous month
        </p>
      )}
      {item.isProjected && (
        <p className="mt-2 text-xs text-gray-500">
          Based on 5% expected growth rate
        </p>
      )}
    </div>
  );
}