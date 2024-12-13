import { BookingsHeader } from "@/components/bookings/BookingsHeader";
import { BookingsList } from "@/components/bookings/BookingsList";
import { BookingsInsights } from "@/components/bookings/BookingsInsights";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddBookingDialog } from "@/components/bookings/AddBookingDialog";

export default function Bookings() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-[#133134]">Bookings</h1>
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-[#C0CCAB] text-[#0D1D1F] hover:bg-[#C0CCAB]/90"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Booking
            </Button>
          </div>
          <BookingsInsights />
          <BookingsList />
          <AddBookingDialog 
            isOpen={isAddDialogOpen} 
            onOpenChange={setIsAddDialogOpen}
            onBookingAdded={() => setIsAddDialogOpen(false)}
          />
        </div>
      </PageContainer>
    </PageWithChat>
  );
}