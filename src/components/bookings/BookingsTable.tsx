import { DataTable } from "@/components/common/DataTable/DataTable";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Booking } from "@/types/booking";
import { useQuery } from "@tanstack/react-query";
import { getBookingColumns } from "./table/BookingTableColumns";
import { statusOptions } from "./table/BookingStatusOptions";
import { supabase } from "@/integrations/supabase/client";
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
        console.log('No organization or account context found:', { organizationId, accountId });
        return [];
      }

      console.log('Fetching bookings with:', { organizationId, accountId });

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          customer:customers(*),
          asset:assets(*),
          site:sites(*)
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

  // Filter bookings based on selected status
  const filteredBookings = selectedStatus === "all" 
    ? bookings 
    : bookings?.filter(booking => booking.status === selectedStatus) || [];

  console.log('Filtered bookings:', filteredBookings);

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  if (!organizationId || !accountId) {
    return (
      <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
        <div className="p-4 text-center text-gray-500">
          Please ensure you have an organization and account selected
        </div>
      </Card>
    );
  }

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <div className="p-4">
        <DataTable
          data={filteredBookings}
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