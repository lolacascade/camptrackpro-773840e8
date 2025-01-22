import { TrendingUp } from "lucide-react";
import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { Customer } from "@/types/customer";

interface AssetsStatCardProps {
  customer?: Customer;
  totalAssets?: number;
  newCustomers?: number;
}

export function AssetsStatCard({ 
  customer, 
  totalAssets = 0, 
  newCustomers = 0 
}: AssetsStatCardProps) {
  return (
    <EnhancedStatCard
      title={customer ? "Assets" : "New Customers"}
      value={String(customer ? totalAssets : newCustomers)}
      icon={TrendingUp}
      trend={{
        value: customer ? "2 assets" : `${newCustomers} customers`,
        isPositive: true,
        comparedTo: "last month"
      }}
      breakdown={[
        { 
          label: "Active", 
          value: String(customer ? totalAssets : 5), 
          percentage: 63 
        },
        { 
          label: "Inactive", 
          value: "0", 
          percentage: 37 
        }
      ]}
    />
  );
}