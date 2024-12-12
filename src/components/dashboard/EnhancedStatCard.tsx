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
  trend,
  breakdown,
  recommendedActions,
}: EnhancedStatCardProps) {
  return (
    <Card className="relative border border-[#E8EBEB] rounded-xl bg-white hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium text-[#3E4238]">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-[#133134]">{value}</div>
              {trend && (
                <Sparkline 
                  className={trend.isPositive ? "text-[#388E3C]" : "text-[#D32F2F]"}
                />
              )}
            </div>
            
            {trend && (
              <div className={`text-sm font-medium ${
                trend.isPositive ? "text-[#388E3C]" : "text-[#D32F2F]"
              }`}>
                {trend.isPositive ? "↑" : "↓"} {trend.value} compared to {trend.comparedTo}
              </div>
            )}
          </div>

          {breakdown && (
            <div className="space-y-2 border-t border-[#E8EBEB] pt-4">
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
            <div className="space-y-3 border-t border-[#E8EBEB] pt-4">
              <h4 className="text-sm font-semibold text-[#133134]">Recommended Actions</h4>
              {recommendedActions.map((action, index) => (
                <div 
                  key={index} 
                  className="p-3 bg-[#F8FAF5] rounded-lg hover:bg-[#F0F4EA] transition-colors cursor-pointer"
                >
                  <p className="text-sm font-medium text-[#3E4238]">{action.label}</p>
                  <p className="text-xs text-[#388E3C] mt-1">{action.impact}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}