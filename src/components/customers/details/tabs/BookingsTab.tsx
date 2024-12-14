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
              accessorKey: "slot.name"
            },
            {
              header: "Check In",
              accessorKey: "check_in_date",
              cell: (item) => new Date(item.check_in_date).toLocaleDateString()
            },
            {
              header: "Check Out",
              accessorKey: "check_out_date",
              cell: (item) => new Date(item.check_out_date).toLocaleDateString()
            },
            {
              header: "Status",
              accessorKey: "status"
            },
            {
              header: "Reservation",
              accessorKey: "reservation_code"
            }
          ]}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}