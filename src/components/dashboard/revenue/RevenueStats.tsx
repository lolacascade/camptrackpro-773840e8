import { RevenueData } from "./types";

interface RevenueStatsProps {
  currentMonthData?: RevenueData;
}

export function RevenueStats({ currentMonthData }: RevenueStatsProps) {
  if (!currentMonthData) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <StatItem
        label="Slip Renewals"
        value={currentMonthData.slipRenewals}
        color="#FF1493"
        trend={{ value: 5, type: "up" }}
      />
      <StatItem
        label="New Rentals"
        value={currentMonthData.newSlipRentals}
        color="#32CD32"
        trend={{ value: 10, type: "up" }}
      />
      <StatItem
        label="Maintenance Services"
        value={currentMonthData.maintenanceServices}
        color="#FFA500"
        trend={{ value: 0, type: "neutral" }}
      />
    </div>
  );
}

interface StatItemProps {
  label: string;
  value: number;
  color: string;
  trend: { value: number; type: "up" | "down" | "neutral" };
}

function StatItem({ label, value, color, trend }: StatItemProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
        <span className="text-[#0D1D1F] text-base">{label}</span>
      </div>
      <div className="mt-2">
        <div className="text-[#0D1D1F] text-2xl font-bold">
          ${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
        <div className="text-[#3E4238] text-base">
          {trend.type === "up" && "↑"}
          {trend.type === "down" && "↓"}
          {trend.value > 0 && ` ${trend.value}% compared to previous month`}
          {trend.value === 0 && "Stable month-over-month"}
        </div>
      </div>
    </div>
  );
}