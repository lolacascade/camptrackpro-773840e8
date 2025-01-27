import { Column } from "@/components/common/DataTable/types";
import { Badge } from "@/components/ui/badge";
import { Booking } from "@/types/booking";

export const getBookingsColumns = (): Column<Booking>[] => [
  {
    header: "Customer",
    accessorKey: "customer",
    cell: (booking: Booking) => {
      const customer = booking.customer;
      if (!customer) return "N/A";
      return (
        <div>
          <p>{`${customer.first_name} ${customer.last_name}`}</p>
          <p className="text-sm text-muted-foreground">{customer.email}</p>
        </div>
      );
    },
  },
  {
    header: "Asset",
    accessorKey: "asset",
    cell: (booking: Booking) => (
      <span>{booking.asset?.asset_name || booking.asset?.name || 'Unassigned'}</span>
    ),
  },
  {
    header: "Check-in",
    accessorKey: "check_in_date",
    cell: (booking: Booking) => (
      <span>
        {new Date(booking.check_in_date).toLocaleDateString()}
      </span>
    ),
  },
  {
    header: "Check-out",
    accessorKey: "check_out_date",
    cell: (booking: Booking) => (
      <span>
        {new Date(booking.check_out_date).toLocaleDateString()}
      </span>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (booking: Booking) => (
      <Badge variant="outline">
        {booking.status}
      </Badge>
    ),
  },
];