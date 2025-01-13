import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BookingsInsights } from "@/components/bookings/BookingsInsights";
import { BookingsTable } from "@/components/bookings/BookingsTable";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";

export default function Bookings() {
  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-[#133134]">Bookings</h1>
            <Button 
              className="bg-[#C0CCAB] text-[#0D1D1F] hover:bg-[#C0CCAB]/90"
            >
              <Plus className="mr-2 h-4 w-4" /> New Booking
            </Button>
          </div>

          <BookingsInsights />
          <BookingsTable />
        </div>
      </PageContainer>
    </PageWithChat>
  );
}