import { useSession } from '@supabase/auth-helpers-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

export function useAverageStayDuration() {
  const session = useSession();

  return useQuery({
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
}