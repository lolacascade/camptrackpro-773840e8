export interface MarinaSummary {
  totalSlips: number;
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