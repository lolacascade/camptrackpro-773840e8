import { useState } from "react";
import type { BookingData } from "@/types/bookings";

interface BookingFiltersProps {
  bookings: BookingData[] | undefined;
  onFilterChange: (filtered: BookingData[]) => void;
}

export function BookingFilters({ bookings, onFilterChange }: BookingFiltersProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [customerFilter, setCustomerFilter] = useState("all");
  const [showTodayOnly, setShowTodayOnly] = useState(false);

  const filters = [
    {
      name: "status",
      options: [
        { label: "All Statuses", value: "all" },
        { label: "Active", value: "active" },
        { label: "Pending", value: "pending" },
        { label: "Confirmed", value: "confirmed" },
        { label: "Completed", value: "completed" },
        { label: "Cancelled", value: "cancelled" }
      ],
      value: statusFilter,
      onChange: setStatusFilter
    },
    {
      name: "customer",
      options: [
        { label: "All Customers", value: "all" },
        ...(bookings?.filter(booking => booking.customer)
          .map(booking => ({
            label: booking.customer!.name,
            value: booking.customer!.id.toString()
          })) || [])
      ],
      value: customerFilter,
      onChange: setCustomerFilter
    }
  ];

  const applyFilters = (bookings: BookingData[] | undefined) => {
    if (!bookings) return [];
    
    return bookings.filter(booking => {
      if (statusFilter !== "all" && booking.status !== statusFilter) {
        return false;
      }

      if (customerFilter !== "all" && booking.customer?.id.toString() !== customerFilter) {
        return false;
      }

      if (showTodayOnly) {
        const today = new Date();
        const checkInDate = new Date(booking.check_in_date);
        if (checkInDate.toDateString() !== today.toDateString()) {
          return false;
        }
      }

      return true;
    });
  };

  return { filters, showTodayOnly, setShowTodayOnly, applyFilters };
}