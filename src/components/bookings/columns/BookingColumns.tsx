import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Column } from "@/components/common/DataTable/types";
import type { BookingData } from "@/types/bookings";

export const getBookingColumns = (): Column<BookingData>[] => [
  {
    header: "Customer",
    accessorKey: "customer.name",
    cell: (booking) => (
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarFallback className="bg-primary/10 text-primary">
            {booking.customer?.name?.split(' ').map(n => n[0]).join('') || '??'}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-[#133134]">
            {booking.customer?.name || 'Unknown Customer'}
          </div>
          <div className="text-sm text-[#3E4238]">
            {booking.customer?.email || 'No email'}
          </div>
        </div>
      </div>
    ),
    sortable: true,
  },
  {
    header: "Slot",
    accessorKey: "slot.name",
    cell: (booking) => booking.slot?.name ?? 'Unassigned',
    sortable: true,
  },
  {
    header: "Assets",
    accessorKey: "assets",
    cell: (booking) => (
      <>
        {booking.assets?.map((asset, index) => (
          <div key={index}>
            <span className="font-medium">{asset.asset_name}</span>
            <Badge variant="secondary" className="ml-2">
              {asset.asset_type}
            </Badge>
          </div>
        ))}
      </>
    ),
  },
  {
    header: "Check-in",
    accessorKey: "check_in_date",
    cell: (booking) => new Date(booking.check_in_date).toLocaleDateString(),
    sortable: true,
  },
  {
    header: "Check-out",
    accessorKey: "check_out_date",
    cell: (booking) => new Date(booking.check_out_date).toLocaleDateString(),
    sortable: true,
  },
  {
    header: "Requirements",
    accessorKey: "special_requirements",
    cell: (booking) => booking.special_requirements || 'None',
    sortable: true,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (booking) => (
      <Badge 
        variant="outline" 
        className={getStatusColor(booking.status)}
      >
        {booking.status}
      </Badge>
    ),
    sortable: true,
  },
];

const getStatusColor = (status: string) => {
  const statusColors = {
    active: "bg-green-100 text-green-800 border-green-200",
    completed: "bg-gray-100 text-gray-800 border-gray-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
    confirmed: "bg-blue-100 text-blue-800 border-blue-200"
  };
  return statusColors[status.toLowerCase()] || statusColors.pending;
};