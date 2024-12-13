import { BookingsHeader } from "@/components/bookings/BookingsHeader";
import { BookingsList } from "@/components/bookings/BookingsList";
import { BookingsInsights } from "@/components/bookings/BookingsInsights";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";

export default function Bookings() {
  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold text-[#133134]">Bookings</h1>
          <BookingsInsights />
          <BookingsList />
        </div>
      </PageContainer>
    </PageWithChat>
  );
}