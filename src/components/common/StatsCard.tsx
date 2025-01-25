import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
    comparedTo: string;
  };
  breakdown?: Array<{
    label: string;
    value: string | number;
    percentage?: number;
  }>;
  recommendedActions?: Array<{
    label: string;
    impact: string;
  }>;
  icon: LucideIcon;
}

export function StatsCard({
  title,
  value,
  trend,
  breakdown,
  recommendedActions,
  icon: Icon
}: StatsCardProps) {
  return (
    <div className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <div className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
        <h3 className="text-sm font-medium text-[#3E4238]">{title}</h3>
        <Icon className="h-4 w-4 text-[#3E4238]" />
      </div>
      <div className="px-6 pb-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-[#133134]">{value}</div>
            {trend && (
              <div className={`text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? '↑' : '↓'} {trend.value} {trend.comparedTo}
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
                    {item.percentage !== undefined && (
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
                  <p className="text-xs text-green-600 mt-1">{action.impact}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}