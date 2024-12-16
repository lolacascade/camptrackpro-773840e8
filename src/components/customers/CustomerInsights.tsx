import { CustomerStatsCards } from "./insights/CustomerStatsCards";
import { CustomerAcquisitionChart } from "./insights/CustomerAcquisitionChart";
import { useCustomerStats } from "./insights/hooks/useCustomerStats";

export function CustomerInsights() {
  const { chartData, currentMonthData, isLoading } = useCustomerStats();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-48 animate-pulse bg-gray-200 rounded-xl" />
        <div className="h-48 animate-pulse bg-gray-200 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CustomerStatsCards />
      <CustomerAcquisitionChart 
        chartData={chartData}
        currentMonthData={currentMonthData}
      />
    </div>
  );
}