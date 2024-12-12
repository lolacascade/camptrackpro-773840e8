import { MarinaStatsProps } from "./types";

export function MarinaStats({ stats, previousMonthComparison }: MarinaStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-8 mb-8">
      <div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#1976D2]"></div>
          <span className="text-[#133134] text-base">Occupied Slips</span>
        </div>
        <div className="mt-2">
          <div className="text-[#133134] text-2xl font-bold">
            {stats.occupied}
          </div>
          <div className="text-[#3E4238] text-base">{previousMonthComparison.occupied}</div>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#F57C00]"></div>
          <span className="text-[#133134] text-base">Available Slips</span>
        </div>
        <div className="mt-2">
          <div className="text-[#133134] text-2xl font-bold">
            {stats.available}
          </div>
          <div className="text-[#3E4238] text-base">{previousMonthComparison.available}</div>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#7B1FA2]"></div>
          <span className="text-[#133134] text-base">In Maintenance</span>
        </div>
        <div className="mt-2">
          <div className="text-[#133134] text-2xl font-bold">
            {stats.maintenance}
          </div>
          <div className="text-[#3E4238] text-base">{previousMonthComparison.maintenance}</div>
        </div>
      </div>
    </div>
  );
}