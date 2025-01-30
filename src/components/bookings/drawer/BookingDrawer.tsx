import { BaseDrawer } from "@/components/common/BaseDrawer";
import { BookingDrawerForm } from "./BookingDrawerForm";
import { useBookingDrawer } from "./useBookingDrawer";
import { useCustomers } from "../form/useCustomers";
import { BookingDrawerProps } from "../types";

export function BookingDrawer({ booking, open, onClose, onBookingUpdated }: BookingDrawerProps) {
  const { dateRange, setDateRange, handleSubmit } = useBookingDrawer({
    booking,
    onClose,
    onBookingUpdated
  });
  
  const { customers } = useCustomers();

  return (
    <BaseDrawer
      open={open}
      onClose={onClose}
      title={booking ? "Edit Booking" : "New Booking"}
    >
      <BookingDrawerForm
        booking={booking}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        onSubmit={handleSubmit}
        customers={customers}
        isSubmitting={false}
      />
    </BaseDrawer>
  );
}