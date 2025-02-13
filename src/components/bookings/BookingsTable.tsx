
import { DataTable } from "@/components/common/DataTable/DataTable";
import { Booking } from "@/types/booking";
import { useBookings } from "./hooks/useBookings";
import { getBookingColumns } from "./table/BookingTableColumns";
import { statusOptions } from "./table/BookingStatusOptions";
import { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";
import { useBookingFilters } from "./hooks/useBookingFilters";
import { usePagination } from "@/hooks/use-pagination";
import { useState } from "react";

interface BookingsTableProps {
  onEdit?: (booking: Booking) => void;
  dateRange?: DateRange;
}

export function BookingsTable({ onEdit, dateRange }: BookingsTableProps) {
  const navigate = useNavigate();
  const { currentPage, itemsPerPage, handlePageChange } = usePagination();
  const { selectedStatus, handleStatusChange } = useBookingFilters();
  const [searchTerm, setSearchTerm] = useState("");

  const { bookings, isLoading, error, total } = useBookings({
    page: currentPage,
    itemsPerPage,
    searchTerm,
    status: selectedStatus,
    dateRange
  });

  const handleRowClick = (booking: Booking) => {
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
      onRowClick={handleRowClick}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      currentPage={currentPage}
      totalPages={Math.ceil(total / itemsPerPage)}
      onPageChange={handlePageChange}
      itemsPerPage={itemsPerPage}
    />
  );
}
