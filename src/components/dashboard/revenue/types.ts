export type RevenueCategory = "all" | "dockage" | "storage" | "maintenance";

export interface RevenueData {
  date: Date;
  month: string;
  year: string;
  slipRenewals: number;
  newSlipRentals: number;
  maintenanceServices: number;
  total?: number;
}

export interface MonthData {
  slipRenewals: number;
  newSlipRentals: number;
  maintenanceServices: number;
  percentageChange: number;
}

export interface ChartDataItem {
  date: Date;
  month: string;
  year: string;
  value: number;
}

export interface Annotation {
  month: string;
  text: string;
  type: "positive" | "negative" | "neutral";
}