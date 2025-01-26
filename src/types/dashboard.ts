export interface MarinaSummary {
  totalSlots: number;
  occupiedSlips: number;
  activeRVs: number;
  occupancyRate: number;
  monthlyRevenue?: number;
  pendingMaintenance?: number;
}

export interface DashboardProps {
  marinaSummary?: MarinaSummary;
  isLoading?: boolean;
}