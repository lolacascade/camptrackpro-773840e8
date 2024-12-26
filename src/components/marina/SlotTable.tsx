import { DataTable } from "@/components/common/DataTable/DataTable";
import { Card } from "@/components/ui/card";
import { Slot } from "@/types/slot";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from '@supabase/auth-helpers-react';
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

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
      
      const typedSlots = (data || []).map(slot => ({
        ...slot,
        status: slot.status as "available" | "occupied" | "maintenance"
      }));
      
      setSlots(typedSlots);
    } catch (error) {
      console.error('Error fetching slots:', error);
      toast({
        title: "Error",
        description: "Failed to load spaces.",
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
        description: "Space deleted successfully",
      });
      
      fetchSlots();
    } catch (error) {
      console.error('Error deleting slot:', error);
      toast({
        title: "Error",
        description: "Failed to delete space",
        variant: "destructive",
      });
    }
  };

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
      sortable: true
    },
    {
      header: "Location",
      accessorKey: "location_identifier",
      sortable: true
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (item: Slot) => {
        const statusColors = {
          available: "bg-green-100 text-green-800",
          occupied: "bg-blue-100 text-blue-800",
          maintenance: "bg-yellow-100 text-yellow-800"
        };

        return (
          <Badge className={statusColors[item.status] || "bg-gray-100 text-gray-800"}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Badge>
        );
      },
      sortable: true
    },
    {
      header: "Size",
      accessorKey: "length_ft",
      cell: (item: Slot) => 
        item.length_ft && item.width_ft 
          ? `${item.length_ft}' × ${item.width_ft}'`
          : "-",
      sortable: true
    },
    {
      header: "Last Activity",
      accessorKey: "last_activity_at",
      cell: (item: Slot) => 
        item.last_activity_at 
          ? format(new Date(item.last_activity_at), "MMM d, yyyy")
          : "-",
      sortable: true
    }
  ];

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
          columns={columns}
          onEdit={onEdit}
          onDelete={handleDelete}
          title="Spaces"
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