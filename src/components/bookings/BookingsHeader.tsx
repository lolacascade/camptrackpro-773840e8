import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function BookingsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-[#133134]">Bookings</h1>
        <p className="text-[#3E4238]">Manage your marina bookings</p>
      </div>
      <Button className="bg-primary hover:bg-primary/90">
        <Plus className="w-4 h-4 mr-2" />
        New Booking
      </Button>
    </div>
  );
}