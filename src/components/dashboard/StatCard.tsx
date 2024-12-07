import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  trend?: "up" | "down";
  trendValue?: string;
}

export function StatCard({ title, value, description, icon: Icon, trend, trendValue }: StatCardProps) {
  return (
    <Card className="border border-[#19383C] rounded-xl bg-transparent">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-[#3E4238]">{title}</CardTitle>
        <Icon className="h-4 w-4 text-[#3E4238]" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-[#133134]">{value}</div>
        <p className="text-base text-[#3E4238]">{description}</p>
        {trend && (
          <div className={`mt-2 text-base text-[#3E4238]`}>
            {trend === "up" ? "↑" : "↓"} {trendValue}
          </div>
        )}
      </CardContent>
    </Card>
  );
}