import { Column } from "@/components/common/DataTable/types";
import { Booking } from "@/types/booking";
import { Button } from "@/components/ui/button";
import { Edit, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const getBookingColumns = (): Column<Booking>[] => [
  {
    header: "Customer",
    accessorKey: "customer",
    cell: (booking: Booking) => {
      const customer = booking.customer;
      return customer ? `${customer.first_name} ${customer.last_name}` : '-';
    },
    sortable: true
  },
  {
    header: "Asset Name",
    accessorKey: "asset_id",
    cell: (booking: Booking) => {
      return booking.asset?.asset_name || booking.asset?.name || '-';
    },
    sortable: true
  },
  {
    header: "Check-in Date",
    accessorKey: "check_in_date",
    cell: (booking: Booking) => new Date(booking.check_in_date).toLocaleDateString(),
    sortable: true
  },
  {
    header: "Check-out Date",
    accessorKey: "check_out_date",
    cell: (booking: Booking) => new Date(booking.check_out_date).toLocaleDateString(),
    sortable: true
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (booking: Booking) => booking.status,
    sortable: true
  },
  {
    header: "Reserved Spot",
    accessorKey: "slot",
    cell: (booking: Booking) => booking.slot?.name || 'Unassigned',
    sortable: true
  },
  {
    header: "Total Amount",
    accessorKey: "total_amount",
    cell: (booking: Booking) => `$${booking.total_amount.toFixed(2)}`,
    sortable: true
  },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: (booking: Booking) => {
      const handleCancel = async () => {
        try {
          const { error } = await supabase
            .from('bookings')
            .update({ status: 'cancelled' })
            .eq('id', booking.id);

          if (error) throw error;
          toast.success("Booking cancelled successfully");
        } catch (error) {
          console.error('Error cancelling booking:', error);
          toast.error("Failed to cancel booking");
        }
      };

      return (
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleCancel();
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      );
    }
  }
];