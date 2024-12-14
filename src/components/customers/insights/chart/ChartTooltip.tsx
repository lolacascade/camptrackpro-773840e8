import { ChartData } from "../types";

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const item = payload[0].payload as ChartData;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <p className="font-semibold text-gray-900 mb-2">
        {`${label} ${item.year}`}
        {item.isProjected && " (Projected)"}
      </p>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#0EA5E9]" />
            <span>New Customers: {payload[0].value}</span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#8B5CF6]" />
            <span>Existing Customers: {payload[1].value}</span>
          </div>
        </div>
      </div>
    </div>
  );
}