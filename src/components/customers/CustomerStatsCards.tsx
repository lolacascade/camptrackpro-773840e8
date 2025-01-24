import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export function CustomerStatsCards() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['customer-stats'],
    queryFn: async () => {
      const { data: customers } = await supabase
        .from('customers')
        .select('*');

      const { data: bookings } = await supabase
        .from('bookings')
        .select('*');

      const totalCustomers = customers?.length || 0;
      const activeBookings = bookings?.filter(b => b.status === 'confirmed')?.length || 0;
      const newThisMonth = customers?.filter(c => {
        const createdAt = new Date(c.created_at);
        const now = new Date();
        return createdAt.getMonth() === now.getMonth() && 
               createdAt.getFullYear() === now.getFullYear();
      }).length || 0;
      
      const totalRevenue = bookings?.reduce((acc, booking) => 
        acc + (booking.total_amount || 0), 0) || 0;

      return {
        totalCustomers,
        activeBookings,
        newThisMonth,
        totalRevenue
      };
    }
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-4 w-[100px] mb-2" />
              <Skeleton className="h-8 w-[120px]" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Total Customers",
      value: stats?.totalCustomers || 0
    },
    {
      title: "Active Bookings",
      value: stats?.activeBookings || 0
    },
    {
      title: "New This Month",
      value: stats?.newThisMonth || 0
    },
    {
      title: "Total Revenue",
      value: `$${(stats?.totalRevenue || 0).toLocaleString()}`
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">{card.title}</p>
            <h3 className="text-2xl font-bold mt-2">{card.value}</h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}