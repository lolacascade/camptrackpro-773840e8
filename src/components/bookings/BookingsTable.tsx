import { DataTable } from "@/components/common/DataTable/DataTable";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Booking } from "@/types/booking";
import { useQuery } from "@tanstack/react-query";
import { getBookingColumns } from "./table/BookingTableColumns";
import { statusOptions } from "./table/BookingStatusOptions";
import { supabase } from "@/integrations/supabase/client";

interface BookingsTableProps {
  onEdit?: (booking: Booking) => void;
}

export function BookingsTable({ onEdit }: BookingsTableProps) {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          slot:slots(name),
          customer:customers(id, first_name, last_name, email)
        `);
      
      if (error) throw error;

      return (data || []).map((booking): Booking => ({
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
        customer: booking.customer ? {
          id: booking.customer.id,
          first_name: booking.customer.first_name,
          last_name: booking.customer.last_name,
          email: booking.customer.email,
          created_at: booking.created_at,
          updated_at: booking.updated_at
        } : undefined,
        slot: booking.slot
      }));
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