import { Card, CardContent } from "@/components/ui/card";
import { ChartSummaryProps } from "./types";

export function ChartSummary({ averageRevenue, chartData }: ChartSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <Card>
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground">Average Monthly Revenue</div>
          <div className="text-2xl font-bold">${averageRevenue.toLocaleString()}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground">Total Revenue (Period)</div>
          <div className="text-2xl font-bold">
            ${chartData.reduce((acc, curr) => 
              acc + (curr.occupied + curr.available + curr.maintenance), 0).toLocaleString()}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground">Average Utilization</div>
          <div className="text-2xl font-bold">
            {Math.round(chartData.reduce((acc, curr) => 
              acc + (curr.occupied / (curr.occupied + curr.available + curr.maintenance)) * 100, 0
            ) / chartData.length)}%
          </div>
        </CardContent>
      </Card>
    </div>
  );
}