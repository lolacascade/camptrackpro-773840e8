import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { format, differenceInDays } from "date-fns";
import { Circle, CircleDot, Calendar } from "lucide-react";

interface CustomerLeaseProgressProps {
  startDate: Date;
  endDate: Date;
}

export function CustomerLeaseProgress({ startDate, endDate }: CustomerLeaseProgressProps) {
  const today = new Date();
  const totalDays = differenceInDays(endDate, startDate);
  const daysElapsed = differenceInDays(today, startDate);
  const progressPercentage = Math.min(Math.round((daysElapsed / totalDays) * 100), 100);

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <CardHeader>
        <CardTitle className="text-[#133134] text-2xl">Lease Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-lg font-medium text-[#133134]">
          {progressPercentage}% of {totalDays}-day lease completed
        </div>

        <div className="space-y-4">
          <Progress value={progressPercentage} className="h-3" />

          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <Circle className="h-4 w-4 text-[#133134]" />
              <span>{format(startDate, "MMM dd, yyyy")}</span>
            </div>
            <div className="flex items-center gap-2">
              <CircleDot className="h-4 w-4 text-primary" />
              <span>Today</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#133134]" />
              <span>{format(endDate, "MMM dd, yyyy")}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}