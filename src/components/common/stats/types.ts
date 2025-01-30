export interface StatsBreakdownItem {
  label: string;
  value: string | number;
  percentage?: number;
}

export interface StatsTrendInfo {
  value: string;
  isPositive: boolean;
  comparedTo: string;
}

export interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: StatsTrendInfo;
  breakdown?: StatsBreakdownItem[];
}