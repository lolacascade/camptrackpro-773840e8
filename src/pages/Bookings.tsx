import { BookingsHeader } from "@/components/bookings/BookingsHeader";
import { BookingsList } from "@/components/bookings/BookingsList";
import { BookingsInsights } from "@/components/bookings/BookingsInsights";
import { PageWithChat } from "@/components/layout/PageWithChat";

export default function Bookings() {
  return (
    <PageWithChat>
      <div className="bg-white rounded-[24px] p-12 space-y-8">
        <BookingsHeader />
        <BookingsInsights />
        <BookingsList />
      </div>
    </PageWithChat>
  );
}