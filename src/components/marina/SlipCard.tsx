import { Card } from "@/components/ui/card";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface SlipCardProps {
  id: number;
  name: string;
  status: 'available' | 'occupied' | 'maintenance';
  boat?: {
    boat_name: string;
    boat_size?: string;
    customers?: {
      name: string;
    };
  };
  customerName?: string;
  maintenanceDescription?: string;
  dock?: string;
  onStatusChange: () => Promise<void>;
  onEdit: () => void;
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
  onEdit,
}: SlipCardProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = async (newStatus: 'available' | 'occupied' | 'maintenance') => {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('slips')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      await onStatusChange();
      toast({
        title: "Status Updated",
        description: `Slip status has been updated to ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating slip status:', error);
      toast({
        title: "Error",
        description: "Failed to update slip status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 border border-[#E8EBEB] bg-transparent relative">
      <Button 
        variant="ghost" 
        size="icon"
        className="absolute top-4 right-4"
        onClick={onEdit}
      >
        <MoreVertical className="h-5 w-5 text-[#133134]" />
      </Button>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-[#133134] pr-8">{name}</h3>
          <p className="text-[#3E4238]">{dock}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[#133134] font-medium">Status</span>
            <span className="text-[#3E4238] capitalize">{status}</span>
          </div>

          {boat && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-[#133134] font-medium">Boat</span>
                <span className="text-[#3E4238]">{boat.boat_name}</span>
              </div>
              {boat.boat_size && (
                <div className="flex items-center justify-between">
                  <span className="text-[#133134] font-medium">Size</span>
                  <span className="text-[#3E4238]">{boat.boat_size}</span>
                </div>
              )}
            </>
          )}

          {customerName && (
            <div className="flex items-center justify-between">
              <span className="text-[#133134] font-medium">Customer</span>
              <span className="text-[#3E4238]">{customerName}</span>
            </div>
          )}

          {maintenanceDescription && (
            <div className="mt-2">
              <span className="text-[#133134] font-medium block">Maintenance Note</span>
              <p className="text-[#3E4238] mt-1">{maintenanceDescription}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}