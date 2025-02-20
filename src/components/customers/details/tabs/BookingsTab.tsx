
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { Booking } from "@/types/booking";

interface BookingsTabProps {
  customerId: string;
}

export function BookingsTab({ customerId }: BookingsTabProps) {
  const { data: bookings } = useQuery({
    queryKey: ['customer-bookings', customerId],
    queryFn: async () => {
      const { data } = await supabase
        .from('bookings')
        .select(`
          *,
          site:sites(name)
        `)
        .eq('customer_id', customerId)
        .order('check_in', { ascending: false });
      return data as Booking[];
    }
  });

  if (!bookings?.length) {
    return (
      <Card className="p-6">
        <p className="text-center text-gray-500">No bookings found</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id} className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Site</p>
              <p>{booking.site?.name || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Check In</p>
              <p>{format(new Date(booking.check_in), 'MMM dd, yyyy')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Check Out</p>
              <p>{format(new Date(booking.check_out), 'MMM dd, yyyy')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="capitalize">{booking.status}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
