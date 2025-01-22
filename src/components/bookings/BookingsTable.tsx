import { DataTable } from "@/components/common/DataTable/DataTable";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Booking } from "@/types/booking";
import { useQuery } from "@tanstack/react-query";
import { getBookingColumns } from "./table/BookingTableColumns";
import { statusOptions } from "./table/BookingStatusOptions";
import { supabase } from "@/integrations/supabase/client";
import { Slot } from "@/types/slot";
import { toast } from "sonner";

interface BookingsTableProps {
  onEdit?: (booking: Booking) => void;
}

export function BookingsTable({ onEdit }: BookingsTableProps) {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      console.log('Fetching bookings...');
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          slot:slots(
            id, name, status, location_identifier, length_ft, width_ft, 
            is_covered, has_water, electricity_voltage, utility_connection_type,
            location_coordinates, customer_id, maintenance_id, created_at, updated_at,
            last_activity_at, user_id
          ),
          customer:customers(*)
        `);
      
      if (error) {
        console.error('Error fetching bookings:', error);
        toast.error("Failed to fetch bookings");
        throw error;
      }

      console.log('Bookings data received:', data);
      
      const mappedData = (data || []).map((booking): Booking => ({
        id: booking.id,
        customer_id: booking.customer_id,
        asset_id: booking.asset_id,
        check_in_date: booking.check_in_date,
        check_out_date: booking.check_out_date,
        status: booking.status,
        total_amount: booking.total_amount,
        created_at: booking.created_at,
        updated_at: booking.updated_at,
        slot_id: booking.slot_id,
        special_requirements: booking.special_requirements,
        reservation_code: booking.reservation_code,
        user_id: booking.user_id,
        customer: booking.customer,
        slot: booking.slot ? {
          ...booking.slot,
          id: Number(booking.slot.id),
          status: booking.slot.status as Slot['status'],
          length_ft: booking.slot.length_ft ? Number(booking.slot.length_ft) : null,
          width_ft: booking.slot.width_ft ? Number(booking.slot.width_ft) : null,
          maintenance_id: booking.slot.maintenance_id ? Number(booking.slot.maintenance_id) : null,
          user_id: booking.slot.user_id || null
        } as Slot : undefined
      }));

      console.log('Mapped bookings data:', mappedData);
      return mappedData;
    }
  });

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

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