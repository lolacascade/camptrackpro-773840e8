interface Trend {
  change: number;
  type: 'positive' | 'negative';
}

interface PerformanceNote {
  month: string;
  message: string;
  type: 'positive' | 'negative';
}

export function calculateTrends(chartData: any[]) {
  const trends: Record<string, Trend> = {};
  const performanceNotes: PerformanceNote[] = [];

  chartData.forEach((item, index) => {
    if (index > 0) {
      const currentTotal = item.occupied + item.available + item.maintenance;
      const previousTotal = chartData[index - 1].occupied + 
                          chartData[index - 1].available + 
                          chartData[index - 1].maintenance;
      
      const change = ((currentTotal - previousTotal) / previousTotal) * 100;
      
      trends[`${item.month}-${item.year}`] = {
        change: Math.round(change * 10) / 10,
        type: change >= 0 ? 'positive' : 'negative'
      };

      // Add significant changes to performance notes
      if (Math.abs(change) > 10) {
        performanceNotes.push({
          month: `${item.month} ${item.year}`,
          message: change >= 0 
            ? `Revenue increased by ${Math.round(change)}%`
            : `Revenue decreased by ${Math.round(Math.abs(change))}%`,
          type: change >= 0 ? 'positive' : 'negative'
        });
      }
    }
  });

  return { trends, performanceNotes };
}