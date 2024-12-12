import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Maintenance } from "@/types/maintenance";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

  const handleStatusChange = async (newStatus: Maintenance['status']) => {
    if (!maintenance) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('maintenance_requests')
        .update({ status: newStatus })
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
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{maintenance.title}</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div>
            <h4 className="font-medium mb-2">Description</h4>
            <p className="text-sm text-muted-foreground">{maintenance.description}</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Status</h4>
            <div className="flex gap-2">
              <Button
                variant={maintenance.status === 'pending' ? 'default' : 'outline'}
                onClick={() => handleStatusChange('pending')}
                disabled={isLoading}
              >
                Pending
              </Button>
              <Button
                variant={maintenance.status === 'in_progress' ? 'default' : 'outline'}
                onClick={() => handleStatusChange('in_progress')}
                disabled={isLoading}
              >
                In Progress
              </Button>
              <Button
                variant={maintenance.status === 'completed' ? 'default' : 'outline'}
                onClick={() => handleStatusChange('completed')}
                disabled={isLoading}
              >
                Completed
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}