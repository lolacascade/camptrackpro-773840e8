export type RevenueCategory = "all" | "renewals" | "new_rentals" | "maintenance";

export interface RevenueData {
  date: Date;
  month: string;
  year: string;
  slipRenewals: number;
  newSlipRentals: number;
  maintenanceServices: number;
  isProjected?: boolean;
}

export interface Annotation {
  month: string;
  text: string;
  type: "positive" | "negative" | "neutral";
}