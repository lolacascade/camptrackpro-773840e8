import { ChartData } from "../types";

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export function ChartTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload) return null;

  return (
    <div className="bg-white p-4 border border-[#E8EBEB] rounded-lg shadow-lg">
      <h4 className="font-medium text-[#133134] mb-2">{label}</h4>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center justify-between gap-4">
          <span style={{ color: entry.color }}>{entry.name}:</span>
          <span className="font-medium">{entry.value}</span>
        </div>
      ))}
      <div className="mt-2 pt-2 border-t border-[#E8EBEB]">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[#133134]">Total:</span>
          <span className="font-medium">
            {payload.reduce((sum, entry) => sum + entry.value, 0)}
          </span>
        </div>
      </div>
    </div>
  );
}