import { BookingsHeader } from "@/components/bookings/BookingsHeader";
import { BookingsList } from "@/components/bookings/BookingsList";
import { BookingsInsights } from "@/components/bookings/BookingsInsights";

export default function Bookings() {
  return (
    <div className="bg-white rounded-[24px] p-12 space-y-8">
      <BookingsHeader />
      <BookingsInsights />
      <BookingsList />
    </div>
  );
}