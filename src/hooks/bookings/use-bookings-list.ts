import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface Booking {
  id: number;
  customer: {
    id: number;
    name: string;
    email: string;
  };
  slot: {
    name: string;
  } | null;
  check_in_date: string;
  check_out_date: string;
  special_requirements: string | null;
  status: string;
  assets: {
    asset_name: string;
    asset_type: string;
  }[];
}

export function useBookingsList(searchTerm: string) {
  const { toast } = useToast();
  
  return useQuery({
    queryKey: ['bookings-list', searchTerm],
    queryFn: async () => {
      const query = supabase
        .from('bookings')
        .select(`
          id,
          check_in_date,
          check_out_date,
          special_requirements,
          status,
          customer:customers(id, name, email),
          slot:slots(name),
          assets:bookings_assets(
            asset:assets(
              asset_name,
              asset_type
            )
          )
        `);

      if (searchTerm) {
        query.or(`customer.name.ilike.%${searchTerm}%,customer.email.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load bookings.",
          variant: "destructive",
        });
        throw error;
      }

      return data?.map(booking => ({
        ...booking,
        assets: booking.assets?.map(ba => ({
          asset_name: ba.asset.asset_name,
          asset_type: ba.asset.asset_type
        })) || []
      })) as Booking[];
    },
  });
}