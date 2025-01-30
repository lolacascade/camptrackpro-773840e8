import { ChartData } from "../types";

interface ChartHeaderProps {
  currentMonthData?: ChartData;
}

export function ChartHeader({ currentMonthData }: ChartHeaderProps) {
  if (!currentMonthData) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
      <div>
        <h4 className="text-sm font-medium text-[#3E4238]">New Customers</h4>
        <p className="text-2xl font-bold text-[#0EA5E9]">
          {currentMonthData.newCustomers}
        </p>
      </div>
      <div>
        <h4 className="text-sm font-medium text-[#3E4238]">Existing Customers</h4>
        <p className="text-2xl font-bold text-[#8B5CF6]">
          {currentMonthData.existingCustomers}
        </p>
      </div>
      <div className="col-span-2 sm:col-span-1">
        <h4 className="text-sm font-medium text-[#3E4238]">Total Customers</h4>
        <p className="text-2xl font-bold text-[#133134]">
          {currentMonthData.newCustomers + currentMonthData.existingCustomers}
        </p>
      </div>
    </div>
  );
}