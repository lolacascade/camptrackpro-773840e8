import { Button } from "@/components/ui/button";
import { type Maintenance } from "@/types/maintenance";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BaseDrawer } from "@/components/common/BaseDrawer";
import { FormSelect } from "@/components/common/FormSelect";

interface MaintenanceDrawerProps {
  maintenance: Maintenance | null;
  open: boolean;
  onClose: () => void;
  onMaintenanceUpdated: () => void;
}

export function MaintenanceDrawer({ 
  maintenance, 
  open, 
  onClose,
  onMaintenanceUpdated 
}: MaintenanceDrawerProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(maintenance?.status || 'pending');

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const priorityOptions = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const handleStatusChange = async (newStatus: string) => {
    if (!maintenance) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('maintenance_requests')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString(),
          completed_at: newStatus === 'completed' ? new Date().toISOString() : null
        })
        .eq('id', maintenance.id);

      if (error) throw error;

      toast({
        title: "Status updated",
        description: `Maintenance request status changed to ${newStatus}`,
      });
      
      onMaintenanceUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating maintenance status:', error);
      toast({
        title: "Error",
        description: "Failed to update maintenance status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!maintenance) return null;

  return (
    <BaseDrawer 
      open={open} 
      onClose={onClose}
      title="Maintenance Request Details"
    >
      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-2">Description</h4>
          <p className="text-sm text-muted-foreground">{maintenance.description}</p>
        </div>

        <div>
          <h4 className="font-medium mb-2">Priority</h4>
          <Badge variant={
            maintenance.priority === 'high' ? 'destructive' :
            maintenance.priority === 'medium' ? 'secondary' :
            'outline'
          }>
            {maintenance.priority}
          </Badge>
        </div>

        <div>
          <h4 className="font-medium mb-2">Status</h4>
          <FormSelect
            value={status}
            onValueChange={handleStatusChange}
            options={statusOptions}
            placeholder="Select status"
            disabled={isLoading}
          />
        </div>

        {maintenance.site_id && (
          <div>
            <h4 className="font-medium mb-2">Site</h4>
            <p className="text-sm text-muted-foreground">
              {maintenance.site?.name || `Site #${maintenance.site_id}`}
            </p>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </BaseDrawer>
  );
}