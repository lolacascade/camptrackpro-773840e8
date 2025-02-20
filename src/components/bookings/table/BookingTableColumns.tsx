
import { Column } from "@/components/common/DataTable/types";
import { Booking } from "@/types/booking";

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
    header: "Site",
    accessorKey: "site_id",
    cell: (booking: Booking) => {
      const site = booking.site;
      return site ? site.name : '-';
    },
    sortable: true
  },
  {
    header: "Check-in Date",
    accessorKey: "check_in",
    cell: (booking: Booking) => {
      return booking.check_in ? new Date(booking.check_in).toLocaleDateString() : '-';
    },
    sortable: true
  },
  {
    header: "Check-out Date",
    accessorKey: "check_out",
    cell: (booking: Booking) => {
      return booking.check_out ? new Date(booking.check_out).toLocaleDateString() : '-';
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
  }
];
