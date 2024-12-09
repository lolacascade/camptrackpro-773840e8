export interface MarinaSummary {
  totalSlips: number;
  occupiedSlips: number;
  activeBoats: number;
  occupancyRate: number;
}

export interface DashboardProps {
  marinaSummary?: MarinaSummary;
  isLoading?: boolean;
}