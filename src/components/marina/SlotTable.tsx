import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Slot } from "@/types/slot";
import { getSlotColumns } from "./table/SlotTableColumns";
import { toast } from "sonner";
import { useState } from "react";
import { EntityDrawer } from "@/components/common/EntityDrawer";
import { useSession } from "@supabase/auth-helpers-react";

interface SlotTableProps {
  onEdit?: (slot: Slot) => void;
}

const statusOptions = [
  { label: "All Statuses", value: "all" },
  { label: "Available", value: "available" },
  { label: "Occupied", value: "occupied" },
  { label: "Maintenance", value: "maintenance" }
];

export function SlotTable({ onEdit }: SlotTableProps) {
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const session = useSession();

  const { data: userProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session?.user?.id)
        .single();
      return profile;
    },
    enabled: !!session?.user?.id
  });

  const { data: slots = [], isLoading, refetch } = useQuery({
    queryKey: ['slots'],
    queryFn: async () => {
      console.log('Fetching slots...');
      const { data, error } = await supabase
        .from('slots')
        .select('*');

      if (error) {
        console.error('Error fetching slots:', error);
        toast.error("Failed to fetch slots");
        return [];
      }

      // Transform the data to match our Slot type
      const transformedSlots: Slot[] = (data || []).map(slot => ({
        id: slot.id,
        name: slot.name,
        status: slot.status as 'available' | 'occupied' | 'maintenance',
        location_identifier: slot.location_identifier || '',
        length_ft: slot.length_ft,
        width_ft: slot.width_ft,
        is_covered: Boolean(slot.is_covered),
        has_water: Boolean(slot.has_water),
        electricity_voltage: slot.electricity_voltage,
        utility_connection_type: slot.utility_connection_type,
        location_coordinates: slot.location_coordinates,
        customer_id: slot.customer_id,
        maintenance_id: slot.maintenance_id,
        last_activity_at: slot.last_activity_at,
        user_id: slot.user_id,
        account_id: slot.account_id,
        organization_id: slot.organization_id
      }));

      console.log('Transformed slots:', transformedSlots);
      return transformedSlots;
    }
  });

  const handleDelete = async (slot: Slot) => {
    try {
      const { error } = await supabase
        .from('slots')
        .delete()
        .eq('id', slot.id);

      if (error) {
        toast.error("Failed to delete slot");
        throw error;
      }

      toast.success("Slot deleted successfully");
      refetch();
    } catch (error) {
      console.error('Error deleting slot:', error);
    }
  };

  const handleEdit = (slot: Slot) => {
    setSelectedSlot(slot);
    setIsDrawerOpen(true);
  };

  const handleViewDetails = (slot: Slot) => {
    setSelectedSlot(slot);
    setIsDrawerOpen(true);
  };

  const slotFields = [
    { name: 'name', label: 'Name', type: 'text' as const, required: true },
    { name: 'status', label: 'Status', type: 'select' as const, required: true, 
      options: [
        { value: 'available', label: 'Available' },
        { value: 'occupied', label: 'Occupied' },
        { value: 'maintenance', label: 'Maintenance' }
      ]
    },
    { name: 'length_ft', label: 'Length (ft)', type: 'number' as const },
    { name: 'width_ft', label: 'Width (ft)', type: 'number' as const },
    { name: 'is_covered', label: 'Is Covered', type: 'select' as const,
      options: [
        { value: 'true', label: 'Yes' },
        { value: 'false', label: 'No' }
      ]
    },
    { name: 'has_water', label: 'Has Water', type: 'select' as const,
      options: [
        { value: 'true', label: 'Yes' },
        { value: 'false', label: 'No' }
      ]
    },
    { name: 'electricity_voltage', label: 'Electricity Voltage', type: 'text' as const },
  ];

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <div className="p-4">
        <DataTable<Slot>
          data={slots}
          columns={getSlotColumns()}
          isLoading={isLoading}
          tableName="slots"
          onViewDetails={handleViewDetails}
          onEdit={handleEdit}
          onDelete={handleDelete}
          filters={[
            {
              name: "status",
              options: statusOptions,
              value: "all",
              onChange: () => {},
            }
          ]}
        />

        <EntityDrawer
          entity={selectedSlot}
          open={isDrawerOpen}
          onClose={() => {
            setIsDrawerOpen(false);
            setSelectedSlot(null);
          }}
          onEntityUpdated={() => {
            refetch();
            setIsDrawerOpen(false);
            setSelectedSlot(null);
          }}
          title="Slot"
          fields={slotFields}
          tableName="slots"
        />
      </div>
    </Card>
  );
}