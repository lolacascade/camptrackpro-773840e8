import { Customer } from "@/types/customer";
import { CustomerStatsCards } from "./insights/CustomerStatsCards";

interface CustomerInsightsProps {
  customer: Customer | null;
}

export function CustomerInsights({ customer }: CustomerInsightsProps) {
  if (!customer) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No customer data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#133134]">{`${customer.first_name} ${customer.last_name}`}</h2>
      <CustomerStatsCards customer={customer} />
    </div>
  );
}