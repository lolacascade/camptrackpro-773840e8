import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { BookingsListFilters } from "./BookingsListFilters";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Booking {
  id: number;
  customer: {
    name: string;
    email: string;
  };
  slot: {
    name: string;
  };
  check_in_date: string;
  check_out_date: string;
}

export function BookingsList() {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings-list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          check_in_date,
          check_out_date,
          customer:customers(name, email),
          slot:slots(name)
        `);

      if (error) throw error;
      return data as Booking[];
    },
  });

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <BookingsListFilters />
      <div className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Slot</TableHead>
              <TableHead>Check-in</TableHead>
              <TableHead>Check-out</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : bookings?.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{booking.customer.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {booking.customer.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{booking.slot.name}</TableCell>
                <TableCell>{new Date(booking.check_in_date).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(booking.check_out_date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {new Date(booking.check_out_date) > new Date() ? 'Active' : 'Completed'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}