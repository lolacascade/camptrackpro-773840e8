import { useState } from "react";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { useBookingsList } from "@/hooks/bookings/use-bookings-list";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useBookingActions } from "@/hooks/bookings/use-booking-actions";
import { BookingFilters } from "./filters/BookingFilters";
import { getBookingColumns } from "./columns/BookingColumns";
import type { BookingData } from "@/types/bookings";

export function BookingsList() {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  }>({ key: 'check_in_date', direction: 'desc' });
  
  const { data: bookings, isLoading, refetch } = useBookingsList("");
  const navigate = useNavigate();
  const { duplicateBooking, deleteBooking } = useBookingActions(refetch);
  const [filteredBookings, setFilteredBookings] = useState<BookingData[]>([]);

  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleViewDetails = (booking: BookingData) => {
    navigate(`/app/bookings/${booking.id}`);
  };

  const { filters, showTodayOnly, setShowTodayOnly, applyFilters } = BookingFilters({
    bookings: bookings as BookingData[],
    onFilterChange: setFilteredBookings
  });

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <div className="p-4">
        <DataTable
          data={applyFilters(bookings as BookingData[]) || []}
          columns={getBookingColumns()}
          isLoading={isLoading}
          filters={filters}
          sortConfig={sortConfig}
          onSort={handleSort}
          showTodayOnly={showTodayOnly}
          onShowTodayChange={setShowTodayOnly}
          tableName="bookings"
          onViewDetails={handleViewDetails}
          onDuplicate={duplicateBooking}
          onDelete={deleteBooking}
        />
      </div>
    </Card>
  );
}