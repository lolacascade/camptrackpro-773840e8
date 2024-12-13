import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddBookingDialog } from "./AddBookingDialog";

export function BookingsHeader() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-[#133134]">Bookings</h1>
      <Button onClick={() => setShowAddDialog(true)}>
        <Plus className="mr-2 h-4 w-4" /> Add Booking
      </Button>
      <AddBookingDialog 
        isOpen={showAddDialog} 
        onOpenChange={setShowAddDialog} 
        onBookingAdded={() => {
          setShowAddDialog(false);
        }} 
      />
    </div>
  );
}