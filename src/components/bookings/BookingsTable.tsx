import { DataTable } from "@/components/common/DataTable/DataTable";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Booking } from "@/types/booking";
import { useBookings } from "./hooks/useBookings";
import { getBookingColumns } from "./table/BookingTableColumns";
import { statusOptions } from "./table/BookingStatusOptions";
import { DateRange } from "react-day-picker";
import { isWithinInterval } from "date-fns";

interface BookingsTableProps {
  onEdit?: (booking: Booking) => void;
  dateRange?: DateRange;
}

export function BookingsTable({ onEdit, dateRange }: BookingsTableProps) {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const { bookings, isLoading, error } = useBookings();

  // Filter bookings based on selected status and date range
  const filteredBookings = bookings?.filter(booking => {
    const matchesStatus = selectedStatus === "all" || booking.status === selectedStatus;
    
    if (!matchesStatus) return false;
    
    if (dateRange?.from && dateRange?.to) {
      const bookingDate = new Date(booking.check_in_date);
      return isWithinInterval(bookingDate, { 
        start: dateRange.from, 
        end: dateRange.to 
      });
    }
    
    return true;
  }) || [];

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  if (error) {
    return (
      <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
        <div className="p-4 text-center text-red-500">
          Error loading bookings. Please try again.
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