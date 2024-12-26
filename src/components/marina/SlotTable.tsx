import { DataTable } from "@/components/common/DataTable/DataTable";
import { getSlotColumns } from "./table/SlotTableColumns";
import { Card } from "@/components/ui/card";
import { Slot } from "@/types/slot";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from '@supabase/auth-helpers-react';

interface SlotTableProps {
  onEdit: (slot: Slot) => void;
}

export function SlotTable({ onEdit }: SlotTableProps) {
  const { toast } = useToast();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession();

  const fetchSlots = async () => {
    try {
      if (!session?.user?.id) return;
      
      const { data, error } = await supabase
        .from('slots')
        .select('*, assets(*)')
        .order('name');

      if (error) throw error;
      setSlots(data || []);
    } catch (error) {
      console.error('Error fetching slots:', error);
      toast({
        title: "Error",
        description: "Failed to load camp spaces.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchSlots();
    }
  }, [session]);

  const handleDelete = async (slot: Slot) => {
    try {
      const { error } = await supabase
        .from('slots')
        .delete()
        .eq('id', slot.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Camp space deleted successfully",
      });
      
      fetchSlots();
    } catch (error) {
      console.error('Error deleting slot:', error);
      toast({
        title: "Error",
        description: "Failed to delete camp space",
        variant: "destructive",
      });
    }
  };

  const statusOptions = [
    { label: "All Statuses", value: "all" },
    { label: "Available", value: "available" },
    { label: "Occupied", value: "occupied" },
    { label: "Maintenance", value: "maintenance" }
  ];

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <div className="p-4">
        <DataTable
          data={slots}
          columns={getSlotColumns()}
          onEdit={onEdit}
          onDelete={handleDelete}
          title="Camp Spaces"
          isLoading={isLoading}
          filters={[
            {
              name: "status",
              options: statusOptions,
              value: "all",
              onChange: () => {},
            }
          ]}
          tableName="slots"
        />
      </div>
    </Card>
  );
}