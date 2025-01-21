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

type BookingWithRelations = {
  id: string;
  customer_id: string;
  asset_id: string;
  check_in_date: string;
  check_out_date: string;
  status: Booking['status'];
  total_amount: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  slot_id: number | null;
  special_requirements: string | null;
  reservation_code: string | null;
  user_id: string | null;
  slot: { name: string } | null;
  customer: { name: string; email: string } | null;
}

export function BookingsTable({ onEdit }: BookingsTableProps) {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('*, slot:slots(name), customer:customers(first_name, last_name, email)');
      
      if (error) throw error;

      // Transform the data to match our expected format
      return (data || []).map((booking): BookingWithRelations => ({
        ...booking,
        customer: booking.customer ? {
          name: `${booking.customer.first_name} ${booking.customer.last_name}`,
          email: booking.customer.email
        } : null
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
          onRowClick={onEdit ? (row) => onEdit(row as Booking) : undefined}
        />
      </div>
    </Card>
  );
}