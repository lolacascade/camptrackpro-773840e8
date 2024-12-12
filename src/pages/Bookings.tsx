import { BookingsHeader } from "@/components/bookings/BookingsHeader";
import { BookingsList } from "@/components/bookings/BookingsList";
import { BookingsInsights } from "@/components/bookings/BookingsInsights";

export default function Bookings() {
  return (
    <div className="p-8 space-y-8">
      <BookingsHeader />
      <BookingsInsights />
      <BookingsList />
    </div>
  );
}