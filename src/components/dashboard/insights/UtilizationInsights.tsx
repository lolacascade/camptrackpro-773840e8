import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function UtilizationInsights() {
  const { data: insights } = useQuery({
    queryKey: ['utilization-insights'],
    queryFn: async () => {
      const { data: slots } = await supabase
        .from('slots')
        .select('id, status')
        .in('status', ['available', 'maintenance']);
      
      const unoccupiedSlots = slots?.filter(slot => slot.status === 'available') || [];
      const maintenanceSlots = slots?.filter(slot => slot.status === 'maintenance') || [];
      
      // Assuming average revenue per slot per week
      const avgRevenuePerSlotWeek = 300;
      const potentialLossUnoccupied = unoccupiedSlots.length * avgRevenuePerSlotWeek;
      const potentialLossMaintenance = maintenanceSlots.length * avgRevenuePerSlotWeek;

      return {
        unoccupiedCount: unoccupiedSlots.length,
        maintenanceCount: maintenanceSlots.length,
        potentialLossUnoccupied,
        potentialLossMaintenance,
      };
    }
  });

  if (!insights) return null;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Utilization Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.unoccupiedCount > 0 && (
            <div>
              <p className="text-sm text-muted-foreground">Unoccupied Slips</p>
              <p className="text-lg font-semibold">
                {insights.unoccupiedCount} slip(s) = ${insights.potentialLossUnoccupied.toLocaleString()} potential revenue loss this week
              </p>
            </div>
          )}
          
          {insights.maintenanceCount > 0 && (
            <div>
              <p className="text-sm text-muted-foreground">Slips in Maintenance</p>
              <p className="text-lg font-semibold">
                {insights.maintenanceCount} slip(s) = ${insights.potentialLossMaintenance.toLocaleString()} potential revenue impact
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}