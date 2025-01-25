import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenueStats } from "./RevenueStats";
import { RevenueChart } from "./RevenueChart";
import { RevenueAnnotations } from "./RevenueAnnotations";
import { RevenueFilter } from "./RevenueFilter";
import { useState } from "react";
import { useRevenueData } from "./useRevenueData";
import { RevenueCategory } from "./types";
import { RevenueBreakdownSkeleton } from "./RevenueBreakdownSkeleton";
import { toast } from "sonner";

export function RevenueBreakdown() {
  const [selectedCategory, setSelectedCategory] = useState<RevenueCategory>("all");
  const { data, isLoading, error } = useRevenueData(selectedCategory);

  if (error) {
    toast.error("Failed to load revenue data. Please try again.");
    return null;
  }

  if (isLoading) {
    return <RevenueBreakdownSkeleton />;
  }

  return (
    <Card className="col-span-2 border border-[#E8EBEB] rounded-xl bg-transparent mb-8">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <CardTitle className="text-[#0D1D1F] text-2xl">Revenue Breakdown</CardTitle>
        <RevenueFilter value={selectedCategory} onChange={setSelectedCategory} />
      </CardHeader>
      <CardContent>
        <RevenueStats currentMonthData={data?.currentMonth} />
        <div className="space-y-4">
          <RevenueAnnotations />
          <RevenueChart data={data?.chartData || []} selectedCategory={selectedCategory} />
        </div>
      </CardContent>
    </Card>
  );
}