import { TrendingUp } from "lucide-react";
import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { Customer } from "@/types/customer";
import { toStringSafe } from "@/lib/typeUtils";

interface AssetsStatCardProps {
  customer?: Customer;
  totalAssets: string;
  newCustomers: string;
}

export function AssetsStatCard({ 
  customer, 
  totalAssets, 
  newCustomers 
}: AssetsStatCardProps) {
  return (
    <EnhancedStatCard
      title={customer ? "Assets" : "New Customers"}
      value={customer ? totalAssets : newCustomers}
      icon={TrendingUp}
      trend={{
        value: customer ? "2 assets" : `${newCustomers} customers`,
        isPositive: true,
        comparedTo: "last month"
      }}
      breakdown={[
        { 
          label: "Active", 
          value: toStringSafe(customer ? totalAssets : 5), 
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