import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SitemapStatsProps {
  totalSlots: number;
  occupiedSlots: number;
  maintenanceSlots: number;
  occupancyRate: number;
}

export function SitemapStats({
  totalSlots,
  occupiedSlots,
  maintenanceSlots,
  occupancyRate
}: SitemapStatsProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Sites</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSlots}</div>
          <p className="text-sm text-muted-foreground">
            {occupiedSlots} occupied, {maintenanceSlots} in maintenance
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Site Utilization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">85%</div>
          <p className="text-sm text-muted-foreground">
            5% increase from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Most Booked Site</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Dock A-12</div>
          <p className="text-sm text-muted-foreground">
            15 bookings this month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Occupancy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{occupancyRate}%</div>
          <p className="text-sm text-muted-foreground">
            8% increase from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
}