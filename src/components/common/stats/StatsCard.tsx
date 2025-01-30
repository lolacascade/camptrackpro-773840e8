import { LucideIcon } from "lucide-react";
import { StatsBreakdown } from "./StatsBreakdown";
import { StatsTrend } from "./StatsTrend";
import { StatsCardProps } from "./types";

export function StatsCard({
  title,
  value,
  trend,
  breakdown,
  icon: Icon
}: StatsCardProps) {
  return (
    <div className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <div className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
        <h3 className="text-sm font-medium text-[#3E4238]">{title}</h3>
        <Icon className="h-4 w-4 text-[#3E4238]" />
      </div>
      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <div className="text-xl sm:text-2xl font-bold text-[#133134]">{value}</div>
            {trend && <StatsTrend {...trend} />}
          </div>

          {breakdown && <StatsBreakdown items={breakdown} />}
        </div>
      </div>
    </div>
  );
}