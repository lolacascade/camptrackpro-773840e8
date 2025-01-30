import { useState } from "react";
import { BookingsInsights } from "@/components/bookings/BookingsInsights";
import { BookingsTable } from "@/components/bookings/BookingsTable";
import { BookingDrawer } from "@/components/bookings/drawer/BookingDrawer";
import { BookingTrendsChart } from "@/components/bookings/BookingTrendsChart";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { BookingsHeader } from "@/components/bookings/components/BookingsHeader";
import { Booking } from "@/types/booking";
import { DateRange } from "react-day-picker";
import { startOfMonth } from "date-fns";

export default function Bookings() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | undefined>();
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  const handleAddBooking = () => {
    setSelectedBooking(undefined);
    setIsDrawerOpen(true);
  };

  const handleEditBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedBooking(undefined);
  };

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
  };

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <BookingsHeader 
            onAdd={handleAddBooking} 
            onDateRangeChange={handleDateRangeChange}
          />
          <BookingsInsights />
          <BookingTrendsChart />
          <BookingsTable onEdit={handleEditBooking} dateRange={dateRange} />

          <BookingDrawer
            booking={selectedBooking}
            open={isDrawerOpen}
            onClose={handleDrawerClose}
            onBookingUpdated={() => {
              // Trigger a refetch in BookingsTable
              // This will be handled by the query invalidation
            }}
          />
        </div>
      </PageContainer>
    </PageWithChat>
  );
}