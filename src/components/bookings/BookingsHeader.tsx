import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function BookingsHeader() {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-[#133134]">Bookings</h1>
      <Button onClick={() => {}}>
        <Plus className="mr-2 h-4 w-4" /> Add Booking
      </Button>
    </div>
  );
}