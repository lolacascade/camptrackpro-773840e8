import { Column } from "@/components/common/DataTable/types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Booking } from "@/types/booking";

export const getBookingsColumns = (): Column<Booking>[] => [
  {
    header: "Customer",
    accessorKey: "customer",
    cell: (booking: Booking) => {
      const customer = booking.customer;
      if (!customer) return "N/A";
      
      return (
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-primary">
              {`${customer.first_name?.[0] || ''}${customer.last_name?.[0] || ''}`}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium text-[#133134]">
                {`${customer.first_name} ${customer.last_name}`}
              </p>
            </div>
            <p className="text-sm text-[#3E4238]">{customer.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    header: "Asset",
    accessorKey: "asset",
    cell: (booking: Booking) => (
      <span className="text-[#3E4238]">
        {booking.asset?.asset_name || booking.asset?.name || 'Unassigned'}
      </span>
    ),
  },
  {
    header: "Check-in",
    accessorKey: "check_in_date",
    cell: (booking: Booking) => (
      <span className="text-[#3E4238]">
        {new Date(booking.check_in_date).toLocaleDateString()}
      </span>
    ),
  },
  {
    header: "Check-out",
    accessorKey: "check_out_date",
    cell: (booking: Booking) => (
      <span className="text-[#3E4238]">
        {new Date(booking.check_out_date).toLocaleDateString()}
      </span>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (booking: Booking) => (
      <Badge variant="outline" className="bg-primary/10 text-primary">
        {booking.status}
      </Badge>
    ),
  },
];