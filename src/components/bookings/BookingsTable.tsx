
import { DataTable } from "@/components/common/DataTable/DataTable";
import { Booking } from "@/types/booking";
import { useBookings } from "./hooks/useBookings";
import { getBookingColumns } from "./table/BookingTableColumns";
import { statusOptions } from "./table/BookingStatusOptions";
import { useNavigate } from "react-router-dom";
import { useBookingFilters } from "./hooks/useBookingFilters";

interface BookingsTableProps {
  onEdit?: (booking: Booking) => void;
}

export function BookingsTable({ onEdit }: BookingsTableProps) {
  const navigate = useNavigate();
  const { filters, updateFilters } = useBookingFilters();
  const ITEMS_PER_PAGE = 25;

  const { bookings, isLoading, error, total } = useBookings({
    filters
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
          value: filters.status,
          onChange: (value) => updateFilters({ status: value as Booking['status'] })
        }
      ]}
      tableName="bookings"
      onRowClick={handleRowClick}
      searchTerm={filters.searchTerm}
      onSearchChange={(term) => updateFilters({ searchTerm: term })}
      currentPage={filters.page}
      totalPages={Math.ceil(total / ITEMS_PER_PAGE)}
      onPageChange={(page) => updateFilters({ page })}
    />
  );
}
