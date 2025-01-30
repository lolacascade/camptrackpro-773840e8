import { LucideIcon } from "lucide-react";

export interface BookingInsight {
  totalBookings: number;
  activeBookings: number;
  todayCheckIns: number;
  totalRevenue: number;
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