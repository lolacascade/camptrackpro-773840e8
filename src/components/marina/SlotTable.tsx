import { useEffect, useState } from "react";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { getSlotColumns } from "./table/SlotTableColumns";
import { supabase } from "@/integrations/supabase/client";
import type { Slot } from "@/types/slot";

interface SlotTableProps {
  onEdit?: (slot: Slot) => void;
}

export function SlotTable({ onEdit }: SlotTableProps) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSlots = async () => {
      const { data, error } = await supabase
        .from('slots')
        .select(`
          *,
          assets (*)
        `);

      if (error) {
        console.error('Error fetching slots:', error);
        setIsLoading(false);
        return;
      }

      const typedSlots = (data || []).map(slot => ({
        ...slot,
        id: String(slot.id),
        status: slot.status as "available" | "occupied" | "maintenance",
        user_id: slot.user_id || null,
        assets: slot.assets?.map(asset => ({
          ...asset,
          id: String(asset.id)
        }))
      }));
      
      setSlots(typedSlots);
      setIsLoading(false);
    };

    fetchSlots();
  }, []);

  const handleSlipClick = (slip: Slot) => {
    console.log('Clicked slip:', slip);
  };

  return (
    <DataTable
      data={slots}
      columns={getSlotColumns()}
      isLoading={isLoading}
      onRowClick={handleSlipClick}
      onEdit={onEdit}
    />
  );
}