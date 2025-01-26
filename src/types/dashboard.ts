export interface MarinaSummary {
  totalSlots: number;
  occupiedSlots: number;
  activeRVs: number;
  occupancyRate: number;
  monthlyRevenue?: number;
  pendingMaintenance?: number;
}

export interface DashboardProps {
  marinaSummary?: MarinaSummary;
  isLoading?: boolean;
}