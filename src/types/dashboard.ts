
export interface DashboardStats {
  occupancyRate: number;
  occupiedSlots: number;
  totalSlots: number;
  activeRVs: number;
}

export interface DashboardProps {
  marinaSummary?: {
    occupancyRate: number;
    occupiedSlots: number;
    totalSlots: number;
    activeRVs: number;
    monthlyRevenue?: number;
    pendingMaintenance?: number;
  };
}
