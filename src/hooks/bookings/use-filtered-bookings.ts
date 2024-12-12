import { useMemo } from "react";
import type { Booking } from "./use-bookings-list";

export function useFilteredBookings(
  bookings: Booking[] | undefined,
  statusFilter: string,
  customerFilter: string
) {
  return useMemo(() => {
    if (!bookings) return [];
    
    return bookings.filter(booking => {
      if (statusFilter !== "all") {
        const today = new Date();
        const checkOutDate = new Date(booking.check_out_date);
        const checkInDate = new Date(booking.check_in_date);
        
        if (statusFilter === "active" && (checkOutDate < today || checkInDate > today)) return false;
        if (statusFilter === "completed" && checkOutDate >= today) return false;
        if (statusFilter === "upcoming" && checkInDate <= today) return false;
      }

      if (customerFilter !== "all" && booking.customer.id.toString() !== customerFilter) {
        return false;
      }

      return true;
    });
  }, [bookings, statusFilter, customerFilter]);
}