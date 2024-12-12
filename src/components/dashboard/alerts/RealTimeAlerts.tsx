import { AlertCircle, Clock, Wrench } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function RealTimeAlerts() {
  const { data: alerts } = useQuery({
    queryKey: ['dashboard-alerts'],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      
      // Get overdue checkouts
      const { data: overdueCheckouts } = await supabase
        .from('bookings')
        .select('id')
        .lt('check_out_date', today)
        .eq('status', 'checked_in');
      
      // Get urgent maintenance tasks
      const { data: urgentTasks } = await supabase
        .from('maintenance_requests')
        .select('id')
        .eq('status', 'pending')
        .eq('priority', 'high');
      
      return {
        overdueCheckouts: overdueCheckouts?.length || 0,
        urgentTasks: urgentTasks?.length || 0
      };
    }
  });

  if (!alerts || (alerts.overdueCheckouts === 0 && alerts.urgentTasks === 0)) {
    return null;
  }

  return (
    <div className="space-y-4 mb-8">
      {alerts.overdueCheckouts > 0 && (
        <Alert variant="destructive">
          <Clock className="h-4 w-4" />
          <AlertTitle>Overdue Check-outs</AlertTitle>
          <AlertDescription>
            {alerts.overdueCheckouts} customer(s) have exceeded their check-out date
          </AlertDescription>
        </Alert>
      )}
      
      {alerts.urgentTasks > 0 && (
        <Alert variant="destructive">
          <Wrench className="h-4 w-4" />
          <AlertTitle>Urgent Maintenance</AlertTitle>
          <AlertDescription>
            {alerts.urgentTasks} urgent maintenance task(s) require attention
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}