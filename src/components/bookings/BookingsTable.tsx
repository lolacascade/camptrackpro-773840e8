
import { DataTable } from "@/components/common/DataTable/DataTable";
import { useState } from "react";
import { Booking } from "@/types/booking";
import { useBookings } from "./hooks/useBookings";
import { getBookingColumns } from "./table/BookingTableColumns";
import { statusOptions } from "./table/BookingStatusOptions";
import { DateRange } from "react-day-picker";
import { isWithinInterval } from "date-fns";
import { useNavigate } from "react-router-dom";

interface BookingsTableProps {
  onEdit?: (booking: Booking) => void;
  dateRange?: DateRange;
}

/**
 * BookingsTable Component
 * 
 * Displays a table of bookings with filtering, sorting, and search capabilities.
 * Integrates with real-time updates and provides booking management functions.
 * 
 * @param onEdit - Optional callback for editing a booking
 * @param dateRange - Optional date range for filtering bookings
 */
export function BookingsTable({ onEdit, dateRange }: BookingsTableProps) {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const { bookings, isLoading, error } = useBookings();
  const navigate = useNavigate();

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

  const handleView = (booking: Booking) => {
    navigate(`/app/bookings/${booking.id}`);
  };

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading bookings. Please try again.
      </div>
    );
  }

  return (
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
      onViewDetails={handleView}
      onEdit={onEdit}
      searchFields={["customer.first_name", "customer.last_name", "customer.email"]}
    />
  );
}
