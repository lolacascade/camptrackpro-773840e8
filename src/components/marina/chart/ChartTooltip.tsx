import { ChartTooltipProps } from "./types";
import { cn } from "@/lib/utils";

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
      {payload.map((entry: any) => (
        <div 
          key={entry.name}
          className="flex items-center justify-between gap-4 text-sm"
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="capitalize">
              {entry.name}: {entry.value} slips
            </span>
          </div>
          <span className="text-gray-500">
            {Math.round((entry.value / (
              item.occupied + item.available + item.maintenance
            )) * 100)}%
          </span>
        </div>
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