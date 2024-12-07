import { Card, CardContent } from "@/components/ui/card";

interface FooterStatsProps {
  totalSlips: number;
}

export function FooterStats({ totalSlips }: FooterStatsProps) {
  return (
    <Card className="mt-8 border border-[#E8EBEB] rounded-xl bg-transparent">
      <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 space-y-4 sm:space-y-0">
        <div className="text-base text-[#3E4238]">
          <span className="font-medium">Total Slips:</span> {totalSlips}
        </div>
        <div className="text-base text-[#3E4238]">
          <span className="font-medium">Active Customers:</span> 95
        </div>
        <div className="text-base text-[#3E4238]">
          <span className="font-medium">Pending Tasks:</span> 8
        </div>
      </CardContent>
    </Card>
  );
}