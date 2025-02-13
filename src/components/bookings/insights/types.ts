
import { LucideIcon } from "lucide-react";

export interface BookingInsight {
  activeBookings: number;
  quarterlyGrowth: number;
  yoyComparison: number;
  avgTenancyDays: number;
  minTenancyDays: number;
  maxTenancyDays: number;
  todayCheckIns: number;
  monthlyCheckIns: number;
  periodCheckIns: number;
  todayCheckOuts: number;
  monthlyCheckOuts: number;
  periodCheckOuts: number;
}

export interface BookingStat {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
}
