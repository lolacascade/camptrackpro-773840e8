import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Boat } from "@/types/boat";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface SlipCardProps {
  id: number;
  name: string;
  status: 'available' | 'occupied' | 'maintenance';
  boat?: Boat;
  customerName?: string;
  maintenanceDescription?: string;
  dock?: string;
  onStatusChange: (id: number, status: 'available' | 'occupied' | 'maintenance') => void;
}

export function SlipCard({
  id,
  name,
  status,
  boat,
  customerName,
  maintenanceDescription,
  dock,
  onStatusChange,
}: SlipCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: 'available' | 'occupied' | 'maintenance') => {
    try {
      setIsUpdating(true);
      
      // Log the status change
      await supabase.from('slip_audit_logs').insert({
        slip_id: id,
        action: 'status_change',
        previous_status: status,
        new_status: newStatus,
        details: boat ? { boat_id: boat.id } : null
      });

      // Update the slip status
      await supabase
        .from('slips')
        .update({ status: newStatus })
        .eq('id', id);

      onStatusChange(id, newStatus);
      toast.success(`Slip ${name} status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating slip status:', error);
      toast.error('Failed to update slip status');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className={`p-4 ${
      status === 'occupied'
        ? 'bg-primary/10'
        : status === 'available'
        ? 'bg-success/10'
        : 'bg-warning/10'
    }`}>
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">
              Dock: {dock || 'Not specified'}
            </p>
          </div>
          <span className="text-sm font-medium capitalize px-2 py-1 rounded-full bg-background">
            {status}
          </span>
        </div>

        {boat && customerName && (
          <div className="text-sm text-muted-foreground">
            <p>Boat: {boat.boat_name}</p>
            <p>Owner: {customerName}</p>
          </div>
        )}

        {maintenanceDescription && (
          <p className="text-sm text-muted-foreground">
            Maintenance: {maintenanceDescription}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mt-4">
          {status !== 'available' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange('available')}
              disabled={isUpdating}
            >
              Set Available
            </Button>
          )}
          
          {status !== 'maintenance' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange('maintenance')}
              disabled={isUpdating}
            >
              Set Maintenance
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}