import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";

interface SlipStatsProps {
  totalSlips?: number;
  availableSlips?: number;
  occupiedSlips?: number;
  maintenanceSlips?: number;
}

export function SlipStats() {
  const { data: stats } = useQuery({
    queryKey: ['slip-stats'],
    queryFn: async () => {
      const { data: slips, error } = await supabase
        .from('slips')
        .select('status');

      if (error) throw error;

      const totalSlips = slips.length;
      const availableSlips = slips.filter(slip => slip.status === 'available').length;
      const occupiedSlips = slips.filter(slip => slip.status === 'occupied').length;
      const maintenanceSlips = slips.filter(slip => slip.status === 'maintenance').length;

      return {
        totalSlips,
        availableSlips,
        occupiedSlips,
        maintenanceSlips
      };
    }
  });

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{stats?.totalSlips || 0}</div>
          <p className="text-xs text-muted-foreground">Total Slips</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-green-600">{stats?.availableSlips || 0}</div>
          <p className="text-xs text-muted-foreground">Available Slips</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-blue-600">{stats?.occupiedSlips || 0}</div>
          <p className="text-xs text-muted-foreground">Occupied Slips</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-orange-600">{stats?.maintenanceSlips || 0}</div>
          <p className="text-xs text-muted-foreground">In Maintenance</p>
        </CardContent>
      </Card>
    </div>
  );
}