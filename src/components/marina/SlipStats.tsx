import { Card, CardContent } from "@/components/ui/card";

interface SlipStatsProps {
  totalSlips: number;
  availableSlips: number;
  occupiedSlips: number;
  maintenanceSlips: number;
}

export function SlipStats({
  totalSlips,
  availableSlips,
  occupiedSlips,
  maintenanceSlips,
}: SlipStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="border border-[#E8EBEB] bg-transparent">
        <CardContent className="p-6">
          <div className="text-[#133134] font-medium">Total Slips</div>
          <div className="text-2xl font-bold text-[#133134]">{totalSlips}</div>
        </CardContent>
      </Card>
      <Card className="border border-[#E8EBEB] bg-transparent">
        <CardContent className="p-6">
          <div className="text-[#133134] font-medium">Available</div>
          <div className="text-2xl font-bold text-[#133134]">{availableSlips}</div>
        </CardContent>
      </Card>
      <Card className="border border-[#E8EBEB] bg-transparent">
        <CardContent className="p-6">
          <div className="text-[#133134] font-medium">Occupied</div>
          <div className="text-2xl font-bold text-[#133134]">{occupiedSlips}</div>
        </CardContent>
      </Card>
      <Card className="border border-[#E8EBEB] bg-transparent">
        <CardContent className="p-6">
          <div className="text-[#133134] font-medium">In Maintenance</div>
          <div className="text-2xl font-bold text-[#133134]">{maintenanceSlips}</div>
        </CardContent>
      </Card>
    </div>
  );
}