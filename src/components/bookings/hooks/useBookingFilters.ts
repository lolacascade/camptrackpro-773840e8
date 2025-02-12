
import { useState } from 'react';
import { DateRange } from "react-day-picker";
import { isWithinInterval } from "date-fns";
import { Booking } from "@/types/booking";

export function useBookingFilters() {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filterBookings = (bookings: Booking[], dateRange?: DateRange) => {
    return bookings.filter(booking => {
      // Status filter
      if (selectedStatus !== "all" && booking.status !== selectedStatus) {
        return false;
      }
      
      // Date range filter
      if (dateRange?.from && dateRange?.to) {
        const bookingDate = new Date(booking.check_in_date);
        return isWithinInterval(bookingDate, { 
          start: dateRange.from, 
          end: dateRange.to 
        });
      }
      
      return true;
    });
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  return {
    selectedStatus,
    handleStatusChange,
    filterBookings
  };
}
