
import { Column } from "@/components/common/DataTable/types";
import { Booking } from "@/types/booking";
import { format } from "date-fns";
import { getStatusLabel } from "@/components/bookings/table/BookingStatusOptions";

export const getBookingColumns = (): Column<Booking>[] => [
  {
    header: "Customer",
    accessorKey: "customer",
    cell: (booking: Booking) => booking.customer ? 
      `${booking.customer.first_name} ${booking.customer.last_name}` : 'N/A'
  },
  {
    header: "Site",
    accessorKey: "site",
    cell: (booking: Booking) => booking.site?.name || 'N/A'
  },
  {
    header: "RV",
    accessorKey: "rv",
    cell: (booking: Booking) => booking.rv ? 
      `${booking.rv.make} ${booking.rv.model}` : 'N/A'
  },
  {
    header: "Check In",
    accessorKey: "check_in",
    cell: (booking: Booking) => format(new Date(booking.check_in), 'MMM dd, yyyy')
  },
  {
    header: "Check Out",
    accessorKey: "check_out",
    cell: (booking: Booking) => format(new Date(booking.check_out), 'MMM dd, yyyy')
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (booking: Booking) => getStatusLabel(booking.status)
  },
  {
    header: "Amount",
    accessorKey: "total_amount",
    cell: (booking: Booking) => booking.total_amount ? 
      `$${booking.total_amount.toFixed(2)}` : '-'
  }
];
