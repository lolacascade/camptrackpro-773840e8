export interface MarinaSummary {
  totalSlots: number;
  occupiedSlots: number;
  maintenanceSlots: number;
  occupancyRate: number;
  activeRVs?: number; // Making it optional since it might not always be available
  monthlyRevenue?: number;
  pendingMaintenance?: number;
}

export interface DashboardProps {
  marinaSummary?: MarinaSummary;
  isLoading?: boolean;
}