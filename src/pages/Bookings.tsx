import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BookingsInsights } from "@/components/bookings/BookingsInsights";
import { BookingsTable } from "@/components/bookings/BookingsTable";
import { BookingDrawer } from "@/components/bookings/drawer/BookingDrawer";
import { BookingTrendsChart } from "@/components/bookings/BookingTrendsChart";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { DateRangeFilter } from "@/components/financials/components/DateRangeFilter";
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
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-[#133134]">Bookings</h1>
            <Button 
              onClick={handleAddBooking}
              className="bg-[#228B22] hover:bg-[#228B22]/90 text-white"
            >
              <Plus className="mr-2 h-4 w-4" /> New Booking
            </Button>
          </div>

          <div className="w-full">
            <DateRangeFilter onDateRangeChange={handleDateRangeChange} />
          </div>

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