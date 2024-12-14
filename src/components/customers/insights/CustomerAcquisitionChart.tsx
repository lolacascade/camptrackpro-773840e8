import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
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
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-[#133134] text-2xl">Customer Growth Trends</CardTitle>
        <div className="flex items-center gap-4">
          <button className="text-[#133134] text-base">&lt;</button>
          <span className="text-[#133134] text-base font-medium">
            {format(new Date(), 'MMM yyyy')}
          </span>
          <button className="text-[#133134] text-base">&gt;</button>
        </div>
      </CardHeader>
      <CardContent>
        <ChartHeader currentMonthData={currentMonthData} />
        <ChartContainer chartData={chartData} />
      </CardContent>
    </Card>
  );
}