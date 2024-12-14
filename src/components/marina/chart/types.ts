export interface DockStats {
  date: Date;
  month: string;
  year: string;
  occupied: number;
  available: number;
  maintenance: number;
  isProjected?: boolean;
}

export interface MarinaChartProps {
  chartData: DockStats[];
}

export interface ChartSummaryProps {
  averageRevenue: number;
  chartData: DockStats[];
}

export interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  trends: Record<string, { change: number }>;
}