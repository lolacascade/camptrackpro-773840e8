import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, Column } from "@/components/common/DataTable/DataTable";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

  const columns: Column<Booking>[] = [
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
            <p className="font-medium text-[#133134]">{booking.customer.name}</p>
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

  const handleViewDetails = (booking: Booking) => {
    console.log('View booking details:', booking.id);
  };

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <CardHeader>
        <CardTitle className="text-[#133134] text-2xl">Today's Check-ins</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          data={bookings || []}
          columns={columns}
          onViewDetails={handleViewDetails}
          itemsPerPage={5}
        />
      </CardContent>
    </Card>
  );
}