import { Customer } from "@/types/customer";
import { CustomerStatsCards } from "./insights/CustomerStatsCards";
import { CustomerTopStats } from "./insights/CustomerTopStats";

interface CustomerInsightsProps {
  customer: Customer | null;
}

export function CustomerInsights({ customer }: CustomerInsightsProps) {
  if (!customer) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#133134]">
        {`${customer.first_name} ${customer.last_name}`}
      </h2>
      <CustomerTopStats customer={customer} />
      <CustomerStatsCards customer={customer} />
    </div>
  );
}