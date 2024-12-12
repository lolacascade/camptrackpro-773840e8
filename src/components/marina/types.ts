export interface DockStats {
  date: Date;
  month: string;
  year: string;
  occupied: number;
  available: number;
  maintenance: number;
  isProjected?: boolean;
}

export interface MarinaStatsProps {
  stats: {
    occupied: number;
    available: number;
    maintenance: number;
  };
  previousMonthComparison: {
    occupied: string;
    available: string;
    maintenance: string;
  };
}

export interface DateRangeControlsProps {
  currentDate: Date;
  dateRange: number;
  onDateRangeChange: (range: number) => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}