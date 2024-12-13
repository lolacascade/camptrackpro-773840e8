import { Column } from "@/components/common/DataTable/types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Booking } from "./types";

export const getBookingsColumns = (): Column<Booking>[] => [
  {
    header: "Priority",
    accessorKey: "priority",
    cell: (booking) => (
      <Badge 
        variant={
          booking.priority === 'high' ? 'destructive' : 
          booking.priority === 'medium' ? 'default' : 
          'secondary'
        }
      >
        {booking.priority}
      </Badge>
    ),
  },
  {
    header: "Customer",
    accessorKey: "customer",
    cell: (booking) => (
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarFallback className="bg-primary/10 text-primary">
            {booking.customer.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium text-[#133134]">{booking.customer.name}</p>
            {booking.customer.isVIP && (
              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                VIP
              </Badge>
            )}
          </div>
          <p className="text-sm text-[#3E4238]">{booking.customer.email}</p>
        </div>
      </div>
    ),
  },
  {
    header: "Slot",
    accessorKey: "slot",
    cell: (booking) => (
      <span className="text-[#3E4238]">{booking.slot?.name ?? 'Unassigned'}</span>
    ),
  },
  {
    header: "Check-in",
    accessorKey: "check_in_date",
    cell: (booking) => (
      <span className="text-[#3E4238]">
        {new Date(booking.check_in_date).toLocaleDateString()}
      </span>
    ),
  },
  {
    header: "Check-out",
    accessorKey: "check_out_date",
    cell: (booking) => (
      <span className="text-[#3E4238]">
        {new Date(booking.check_out_date).toLocaleDateString()}
      </span>
    ),
  },
  {
    header: "Status",
    accessorKey: "check_out_date",
    cell: (booking) => (
      <Badge variant="outline" className="bg-primary/10 text-primary">
        {new Date(booking.check_out_date) > new Date() ? 'Active' : 'Completed'}
      </Badge>
    ),
  },
];