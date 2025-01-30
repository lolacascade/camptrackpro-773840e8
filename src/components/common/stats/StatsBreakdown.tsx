import { StatsBreakdownItem } from "./types";

interface StatsBreakdownProps {
  items: StatsBreakdownItem[];
}

export function StatsBreakdown({ items }: StatsBreakdownProps) {
  return (
    <div className="space-y-2 border-t border-[#E8EBEB] pt-4">
      {items.map((item, index) => (
        <div key={index} className="flex justify-between text-sm">
          <span className="text-[#3E4238]">{item.label}</span>
          <span className="font-medium text-[#133134]">
            {item.value}
            {item.percentage !== undefined && (
              <span className="text-[#3E4238] ml-1">
                ({item.percentage}%)
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}