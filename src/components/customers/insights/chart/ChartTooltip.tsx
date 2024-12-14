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
              {entry.name === 'newCustomers' ? 'New Customers' : 'Existing Customers'}: {entry.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}