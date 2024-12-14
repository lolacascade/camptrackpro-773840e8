import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartHeader } from "./chart/ChartHeader";
import { ChartContainer } from "./chart/ChartContainer";
import { ChartData } from "./types";

interface CustomerAcquisitionChartProps {
  chartData: ChartData[];
  currentMonthData?: ChartData;
}

export function CustomerAcquisitionChart({ 
  chartData, 
  currentMonthData 
}: CustomerAcquisitionChartProps) {
  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <CardHeader>
        <CardTitle className="text-[#133134] text-2xl">Customer Growth Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartHeader currentMonthData={currentMonthData} />
        <ChartContainer chartData={chartData} />
      </CardContent>
    </Card>
  );
}