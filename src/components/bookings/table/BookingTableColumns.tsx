import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Column } from "@/components/common/DataTable/types";
import { Booking } from "@/types/booking";

export const getBookingColumns = (): Column<Booking>[] => [
  {
    header: "Customer",
    accessorKey: "customer.name",
  },
  {
    header: "Slot",
    accessorKey: "slot.name",
  },
  {
    header: "Check In",
    accessorKey: "check_in_date",
    cell: (item: Booking) => format(new Date(item.check_in_date), "MMM d, yyyy")
  },
  {
    header: "Check Out",
    accessorKey: "check_out_date",
    cell: (item: Booking) => format(new Date(item.check_out_date), "MMM d, yyyy")
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (item: Booking) => {
      const statusColors = {
        pending: "bg-yellow-100 text-yellow-800",
        confirmed: "bg-green-100 text-green-800",
        checked_in: "bg-blue-100 text-blue-800",
        completed: "bg-gray-100 text-gray-800",
        cancelled: "bg-red-100 text-red-800"
      };

      return (
        <Badge className={statusColors[item.status] || "bg-gray-100 text-gray-800"}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Badge>
      );
    }
  },
  {
    header: "Reservation Code",
    accessorKey: "reservation_code",
  }
];