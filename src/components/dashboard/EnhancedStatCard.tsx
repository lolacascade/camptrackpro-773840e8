import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Sparkline } from "./Sparkline";

interface TrendInfo {
  value: string;
  isPositive: boolean;
  comparedTo: string;
}

interface Breakdown {
  label: string;
  value: string;
  percentage?: number;
}

interface Action {
  label: string;
  impact: string;
}

interface EnhancedStatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: TrendInfo;
  breakdown?: Breakdown[];
  recommendedActions?: Action[];
}

export function EnhancedStatCard({
  title,
  value,
  icon: Icon,
  trend,
  breakdown,
  recommendedActions,
}: EnhancedStatCardProps) {
  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-[#3E4238]">{title}</CardTitle>
        <Icon className="h-4 w-4 text-[#3E4238]" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-[#133134]">{value}</div>
            {trend && (
              <Sparkline 
                className={trend.isPositive ? "text-[#388E3C]" : "text-[#D32F2F]"}
              />
            )}
          </div>
          
          {trend && (
            <div className={`text-sm ${
              trend.isPositive ? "text-[#388E3C]" : "text-[#D32F2F]"
            }`}>
              {trend.isPositive ? "↑" : "↓"} {trend.value} compared to {trend.comparedTo}
            </div>
          )}

          {breakdown && (
            <div className="space-y-2 border-t border-[#E8EBEB] pt-3">
              {breakdown.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-[#3E4238]">{item.label}</span>
                  <span className="font-medium text-[#133134]">
                    {item.value}
                    {item.percentage && (
                      <span className="text-[#3E4238] ml-1">
                        ({item.percentage}%)
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}

          {recommendedActions && recommendedActions.length > 0 && (
            <div className="space-y-2 border-t border-[#E8EBEB] pt-3">
              <h4 className="text-sm font-medium text-[#133134]">Recommended Actions</h4>
              {recommendedActions.map((action, index) => (
                <div key={index} className="text-sm">
                  <p className="text-[#3E4238]">{action.label}</p>
                  <p className="text-[#388E3C] text-xs">{action.impact}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}