
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { useNavigate } from "react-router-dom";
import { getBookingsColumns } from "./bookings/BookingsColumns";
import { Booking } from "@/types/booking";
import { useOrganization } from "@/hooks/use-organization";
import { toast } from "sonner";

export function BookingsToday() {
  const navigate = useNavigate();
  const { organizationId, accountId, isLoading: isLoadingContext } = useOrganization();
  
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['bookings-today', organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) return [];

      const today = new Date().toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          customer:customers(
            id,
            first_name,
            last_name,
            email,
            created_at,
            updated_at,
            user_id
          ),
          asset:assets(
            id,
            asset_name,
            name
          )
        `)
        .eq('check_in_date', today)
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (error) {
        toast.error("Failed to fetch today's bookings");
        throw error;
      }

      return data as unknown as Booking[];
    },
    enabled: !!organizationId && !!accountId && !isLoadingContext
  });

  const handleViewDetails = (booking: Booking) => {
    navigate(`/app/bookings/${booking.id}`);
  };

  if (isLoadingContext) {
    return null;
  }

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <CardHeader>
        <CardTitle className="text-[#133134] text-2xl">Today's Check-ins</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          data={bookings}
          columns={getBookingsColumns()}
          onViewDetails={handleViewDetails}
          itemsPerPage={5}
          isLoading={isLoading}
          tableName="bookings"
        />
      </CardContent>
    </Card>
  );
}
