
import { Column } from "@/components/common/DataTable/types";
import { Booking } from "@/types/booking";
import { DataTableRowActions } from "@/components/common/DataTable/DataTableRowActions";
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
    header: "Asset",
    accessorKey: "asset",
    cell: (booking: Booking) => {
      return booking.asset?.asset_name || booking.asset?.name || '-';
    },
    sortable: true
  },
  {
    header: "Check-in Date",
    accessorKey: "check_in_date",
    cell: (booking: Booking) => {
      return booking.check_in_date ? new Date(booking.check_in_date).toLocaleDateString() : '-';
    },
    sortable: true
  },
  {
    header: "Check-out Date",
    accessorKey: "check_out_date",
    cell: (booking: Booking) => {
      return booking.check_out_date ? new Date(booking.check_out_date).toLocaleDateString() : '-';
    },
    sortable: true
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (booking: Booking) => {
      const statusClasses = {
        pending: "text-yellow-600",
        confirmed: "text-blue-600",
        checked_in: "text-green-600",
        completed: "text-gray-600",
        cancelled: "text-red-600"
      };
      return (
        <span className={statusClasses[booking.status] || ""}>
          {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1)}
        </span>
      );
    },
    sortable: true
  },
  {
    header: "Total Amount",
    accessorKey: "total_amount",
    cell: (booking: Booking) => {
      return booking.total_amount ? `$${booking.total_amount.toFixed(2)}` : '$0.00';
    },
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
        <DataTableRowActions 
          row={booking}
          onDelete={handleCancel}
        />
      );
    }
  }
];
