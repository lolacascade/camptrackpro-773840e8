import { Booking } from "@/types/booking";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable/DataTable";

interface BookingsTabProps {
  bookings: Booking[];
  isLoading: boolean;
}

export function BookingsTab({ bookings, isLoading }: BookingsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking History</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          data={bookings || []}
          columns={[
            { 
              header: "Slot",
              accessorKey: "slot.name",
              cell: (booking: Booking) => booking.slot?.name || 'Unassigned'
            },
            {
              header: "Check In",
              accessorKey: "check_in_date",
              cell: (booking: Booking) => new Date(booking.check_in_date).toLocaleDateString()
            },
            {
              header: "Check Out",
              accessorKey: "check_out_date",
              cell: (booking: Booking) => new Date(booking.check_out_date).toLocaleDateString()
            },
            {
              header: "Status",
              accessorKey: "status",
              cell: (booking: Booking) => booking.status
            },
            {
              header: "Reservation",
              accessorKey: "reservation_code",
              cell: (booking: Booking) => booking.reservation_code || '-'
            }
          ]}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}