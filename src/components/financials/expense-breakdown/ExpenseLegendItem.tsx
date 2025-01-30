import { ExpenseLegendItemProps } from "./types";

export function ExpenseLegendItem({ category, amount, percentage, color }: ExpenseLegendItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div 
          className="w-3 h-3 rounded-full" 
          style={{ backgroundColor: color }}
        />
        <span className="text-sm font-medium">{category}</span>
      </div>
      <div className="flex gap-4">
        <span className="text-sm text-gray-600">${amount.toLocaleString()}</span>
        <span className="text-sm text-gray-500">{percentage}%</span>
      </div>
    </div>
  );
}