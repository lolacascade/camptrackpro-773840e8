import { useSession } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { StatCard } from "@/components/dashboard/StatCard";
import { ChartBar, Clock, MapPin, StickyNote } from "lucide-react";

export function CustomerInsights() {
  const session = useSession();

  // Fetch average value per client
  const { data: averageValue } = useQuery({
    queryKey: ['customerAverageValue'],
    queryFn: async () => {
      const { data: bookings, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          customer_id,
          invoices!inner (
            amount,
            status
          )
        `)
        .eq('invoices.status', 'paid')
        .eq('user_id', session?.user?.id);
      
      if (bookingsError) throw bookingsError;
      
      if (!bookings || bookings.length === 0) return '$0.00';
      
      const totalAmount = bookings.reduce((sum, booking) => {
        return sum + booking.invoices.reduce((invoiceSum: number, invoice: any) => 
          invoiceSum + Number(invoice.amount), 0);
      }, 0);
      
      const average = totalAmount / bookings.length;
      return average.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    },
    enabled: !!session?.user?.id
  });

  const { data: avgStayDuration } = useQuery({
    queryKey: ['averageStayDuration'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('check_in_date, check_out_date');
      
      if (error) throw error;
      
      const durations = data.map(booking => {
        const checkIn = new Date(booking.check_in_date);
        const checkOut = new Date(booking.check_out_date);
        return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      });
      
      const average = durations.reduce((sum, duration) => sum + duration, 0) / durations.length;
      return `${Math.round(average)} days`;
    },
    enabled: !!session?.user?.id
  });

  // Fetch preferred slot/zone
  const { data: preferredSpot } = useQuery({
    queryKey: ['preferredSpot'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          slot_id,
          slots (
            name,
            zone
          )
        `)
        .order('slot_id');
      
      if (error) throw error;
      
      // Find the most frequent slot
      const slotCounts = data.reduce((acc: any, booking) => {
        const slotId = booking.slot_id;
        acc[slotId] = (acc[slotId] || 0) + 1;
        return acc;
      }, {});
      
      const mostFrequentSlotId = Object.entries(slotCounts)
        .sort(([,a]: any, [,b]: any) => b - a)[0]?.[0];
      
      const preferredSlot = data.find(booking => booking.slot_id.toString() === mostFrequentSlotId);
      return preferredSlot?.slots ? 
        `${preferredSlot.slots.name} / ${preferredSlot.slots.zone || 'N/A'}` : 
        'No preference yet';
    },
    enabled: !!session?.user?.id
  });

  // Fetch latest note/tag
  const { data: latestNote } = useQuery({
    queryKey: ['latestNote'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customer_notes')
        .select('note, tag')
        .order('created_at', { ascending: false })
        .limit(1);
      
      if (error) throw error;
      
      return data[0] ? `${data[0].tag}: ${data[0].note}` : 'No notes yet';
    },
    enabled: !!session?.user?.id
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <StatCard
        title="Average Revenue Per Stay"
        value={averageValue || '$0.00'}
        description="Average revenue per booking"
        icon={ChartBar}
        trend="up"
        trendValue="Based on paid invoices"
      />
      <StatCard
        title="Average Stay Duration"
        value={avgStayDuration || '0 days'}
        description="Average length of stay per visit"
        icon={Clock}
        trend="up"
        trendValue="Calculated from bookings"
      />
      <StatCard
        title="Preferred Location"
        value={preferredSpot || 'No preference'}
        description="Most commonly used spot"
        icon={MapPin}
        trend="up"
        trendValue="Based on booking history"
      />
      <StatCard
        title="Latest Note"
        value={latestNote || 'No notes'}
        description="Most recent customer note"
        icon={StickyNote}
        trend="up"
        trendValue="From customer notes"
      />
    </div>
  );
}
