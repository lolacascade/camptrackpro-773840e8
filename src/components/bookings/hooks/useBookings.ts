import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from '@supabase/auth-helpers-react';
import { supabase } from "@/integrations/supabase/client";
import { Booking } from "@/types/booking";

export const useBookings = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession();

  const fetchBookings = async () => {
    try {
      if (!session?.user?.id) return;
      
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          customer:customers(name, email),
          slot:slots(name)
        `)
        .order('check_in_date', { ascending: false });

      if (error) throw error;
      
      const typedBookings = (data || []).map(booking => ({
        ...booking,
        status: booking.status as Booking['status']
      }));
      
      setBookings(typedBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Error",
        description: "Failed to load bookings.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchBookings();
    }
  }, [session]);

  return {
    bookings,
    isLoading,
    refetch: fetchBookings
  };
};