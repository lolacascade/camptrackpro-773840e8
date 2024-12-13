import { BookingsHeader } from "@/components/bookings/BookingsHeader";
import { BookingsList } from "@/components/bookings/BookingsList";
import { BookingsInsights } from "@/components/bookings/BookingsInsights";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";

export default function Bookings() {
  return (
    <PageWithChat>
      <PageContainer>
        <BookingsHeader />
        <BookingsInsights />
        <BookingsList />
      </PageContainer>
    </PageWithChat>
  );
}