
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

export function BookingsTable({ onEdit, dateRange }: BookingsTableProps) {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;
  const { bookings, total, isLoading, error } = useBookings(currentPage, itemsPerPage);
  const navigate = useNavigate();

  const filteredBookings = bookings?.filter(booking => {
    // First apply status filter
    if (selectedStatus !== "all" && booking.status !== selectedStatus) {
      return false;
    }
    
    // Then apply date range filter if it exists
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
    console.log('Status changed to:', value);
    setSelectedStatus(value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowClick = (booking: Booking) => {
    console.log('Row clicked, navigating to:', `/app/bookings/${booking.id}`);
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
      onRowClick={handleRowClick}
      searchFields={["customer.first_name", "customer.last_name", "customer.email"]}
      currentPage={currentPage}
      totalPages={Math.ceil(total / itemsPerPage)}
      onPageChange={handlePageChange}
      itemsPerPage={itemsPerPage}
    />
  );
}
