import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

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

export function BookingsToday() {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings-today'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          check_in_date,
          check_out_date,
          customer:customers(name, email),
          slot:slots(name)
        `)
        .eq('check_in_date', new Date().toISOString().split('T')[0]);

      if (error) {
        console.error('Error fetching bookings:', error);
        throw error;
      }

      return data as Booking[];
    },
  });

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <CardHeader>
        <CardTitle className="text-[#133134] text-2xl">Today's Check-ins</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : bookings && bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-[#E8EBEB] bg-white"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {booking.customer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-[#133134]">{booking.customer.name}</p>
                      <p className="text-sm text-[#3E4238]">{booking.slot.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#3E4238]">Check-in</p>
                    <p className="text-sm text-[#3E4238]">
                      {new Date(booking.check_in_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-[#3E4238] py-8">
              No check-ins scheduled for today
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}