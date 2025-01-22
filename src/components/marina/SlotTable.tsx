import { useEffect, useState } from "react";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { getSlotColumns } from "./table/SlotTableColumns";
import { supabase } from "@/integrations/supabase/client";
import type { Slot } from "@/types/slot";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface SlotTableProps {
  onEdit?: (slot: Slot) => void;
}

export function SlotTable({ onEdit }: SlotTableProps) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const { data, error } = await supabase
          .from('slots')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching slots:', error);
          toast.error('Failed to load slots');
          return;
        }

        if (!data) {
          console.log('No slots found');
          setSlots([]);
          return;
        }

        const typedSlots: Slot[] = data.map(slot => ({
          ...slot,
          id: String(slot.id),
          status: (slot.status === "occupied" || slot.status === "maintenance" || slot.status === "available") 
            ? (slot.status as "occupied" | "maintenance" | "available")
            : "available",
          name: slot.name || "",
          dock: slot.dock || null,
          zone: slot.zone || null,
          length_ft: slot.length_ft || null,
          width_ft: slot.width_ft || null,
          is_covered: slot.is_covered || false,
          has_water: slot.has_water || false,
          electricity_voltage: slot.electricity_voltage || null,
          utility_connection_type: slot.utility_connection_type || null,
          location_coordinates: slot.location_coordinates || null,
          customer_id: slot.customer_id || null,
          maintenance_id: slot.maintenance_id || null,
          last_activity_at: slot.last_activity_at || null,
          user_id: slot.user_id || null,
          created_at: slot.created_at || null,
          updated_at: slot.updated_at || null
        }));
        
        console.log('Fetched slots:', typedSlots);
        setSlots(typedSlots);
      } catch (error) {
        console.error('Error in fetchSlots:', error);
        toast.error('Failed to load slots');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlots();
  }, []);

  const handleSlipClick = (slip: Slot) => {
    console.log('Clicked slip:', slip);
  };

  const filters = [
    {
      name: "status",
      options: [
        { label: "All Statuses", value: "all" },
        { label: "Available", value: "available" },
        { label: "Occupied", value: "occupied" },
        { label: "Maintenance", value: "maintenance" }
      ],
      value: statusFilter,
      onChange: setStatusFilter
    }
  ];

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-white">
      <div className="p-4">
        <DataTable
          data={slots}
          columns={getSlotColumns()}
          isLoading={isLoading}
          onRowClick={handleSlipClick}
          onEdit={onEdit}
          title="Spots"
          filters={filters}
        />
      </div>
    </Card>
  );
}