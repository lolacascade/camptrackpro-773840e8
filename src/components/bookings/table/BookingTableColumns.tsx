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
    header: "Asset Name",
    accessorKey: "asset_id",
    cell: (booking: Booking) => {
      // Get the asset name from the related asset
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
    cell: (booking: Booking) => (
      <div>
        {/* Actions will be handled by DataTableRowActions component */}
      </div>
    )
  }
];