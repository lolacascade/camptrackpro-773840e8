
import { DataTable } from "@/components/common/DataTable/DataTable";
import { Booking } from "@/types/booking";
import { useBookings } from "./hooks/useBookings";
import { getBookingColumns } from "./table/BookingTableColumns";
import { statusOptions } from "./table/BookingStatusOptions";
import { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";
import { useBookingFilters } from "./hooks/useBookingFilters";
import { usePagination } from "@/hooks/use-pagination";

interface BookingsTableProps {
  onEdit?: (booking: Booking) => void;
  dateRange?: DateRange;
}

export function BookingsTable({ onEdit, dateRange }: BookingsTableProps) {
  const navigate = useNavigate();
  const { currentPage, itemsPerPage, handlePageChange } = usePagination();
  const { selectedStatus, handleStatusChange } = useBookingFilters();
  const { bookings, isLoading, error, total } = useBookings({
    page: currentPage,
    itemsPerPage
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
      searchFields={["customer.first_name", "customer.last_name", "customer.email"]}
      currentPage={currentPage}
      totalPages={Math.ceil(total / itemsPerPage)}
      onPageChange={handlePageChange}
      itemsPerPage={itemsPerPage}
      dateRange={dateRange}
      dateField="check_in_date"
    />
  );
}
