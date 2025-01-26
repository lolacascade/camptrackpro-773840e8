import { DataTable } from "@/components/common/DataTable/DataTable";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Booking } from "@/types/booking";
import { useQuery } from "@tanstack/react-query";
import { getBookingColumns } from "./table/BookingTableColumns";
import { statusOptions } from "./table/BookingStatusOptions";
import { supabase } from "@/integrations/supabase/client";
import { Site } from "@/types/site";
import { toast } from "sonner";
import { useOrganization } from "@/hooks/use-organization";

interface BookingsTableProps {
  onEdit?: (booking: Booking) => void;
}

export function BookingsTable({ onEdit }: BookingsTableProps) {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const { organizationId, accountId } = useOrganization();

  const { data: bookings = [], isLoading, error } = useQuery({
    queryKey: ['bookings', organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        throw new Error("No organization or account context found");
      }

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          site:sites(
            id, name, status, location_identifier, length_ft, width_ft, 
            is_covered, has_water, electricity_voltage, utility_connection_type,
            location_coordinates, customer_id, maintenance_id, created_at, updated_at,
            last_activity_at, user_id
          ),
          customer:customers(*),
          asset:assets(*)
        `)
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);
      
      if (error) {
        console.error('Error fetching bookings:', error);
        toast.error("Failed to fetch bookings");
        throw error;
      }

      console.log('Bookings data received:', data);
      
      return data as Booking[];
    },
    enabled: !!organizationId && !!accountId
  });

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  // Handle query error
  if (error) {
    toast.error("Failed to load bookings. Please try again.");
  }

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <div className="p-4">
        <DataTable
          data={bookings}
          columns={getBookingColumns()}
          isLoading={isLoading}
          filters={[
            {
              name: "status",
              options: statusOptions,
              value: selectedStatus,
              onChange: handleStatusChange,
            }
          ]}
          tableName="bookings"
          onRowClick={onEdit}
        />
      </div>
    </Card>
  );
}