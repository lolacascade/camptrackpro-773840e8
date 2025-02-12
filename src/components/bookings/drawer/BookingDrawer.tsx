
import { BaseDrawer } from "@/components/common/drawer";
import { Booking } from "@/types/booking";
import { useCustomers } from "../form/useCustomers";
import { useBookingForm } from "./useBookingForm";
import { BookingForm } from "./BookingForm";

interface BookingDrawerProps {
  booking?: Booking;
  open: boolean;
  onClose: () => void;
  onBookingUpdated: () => void;
}

export function BookingDrawer({ booking, open, onClose, onBookingUpdated }: BookingDrawerProps) {
  const { customers } = useCustomers();
  const {
    form,
    dateRange,
    setDateRange,
    onSubmit
  } = useBookingForm({ booking, onClose, onBookingUpdated });

  return (
    <BaseDrawer
      open={open}
      onClose={onClose}
      title={booking ? "Edit Booking" : "New Booking"}
    >
      <BookingForm
        form={form}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        customers={customers}
        onSubmit={onSubmit}
        isEdit={!!booking}
      />
    </BaseDrawer>
  );
}
