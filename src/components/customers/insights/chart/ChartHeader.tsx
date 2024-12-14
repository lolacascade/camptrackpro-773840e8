import { format } from "date-fns";
import { ChartData } from "../types";

interface ChartHeaderProps {
  currentMonthData?: ChartData;
}

export function ChartHeader({ currentMonthData }: ChartHeaderProps) {
  return (
    <div className="grid grid-cols-2 gap-8 mb-8">
      <div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#0EA5E9]"></div>
          <span className="text-[#133134] text-base">New Customers</span>
        </div>
        <div className="mt-2">
          <div className="text-[#133134] text-2xl font-bold">
            {currentMonthData?.newCustomers || 0}
          </div>
          <div className="text-[#3E4238] text-base">
            This month's acquisitions
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#8B5CF6]"></div>
          <span className="text-[#133134] text-base">Existing Customers</span>
        </div>
        <div className="mt-2">
          <div className="text-[#133134] text-2xl font-bold">
            {currentMonthData?.existingCustomers || 0}
          </div>
          <div className="text-[#3E4238] text-base">
            Total retained customers
          </div>
        </div>
      </div>
    </div>
  );
}