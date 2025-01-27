import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BookingsPriorityFilter } from "./bookings/BookingsPriorityFilter";
import { getBookingsColumns } from "./bookings/BookingsColumns";
import { Booking } from "@/types/booking";
import { useOrganization } from "@/hooks/use-organization";
import { toast } from "sonner";

export function BookingsToday() {
  const navigate = useNavigate();
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const { organizationId, accountId } = useOrganization();
  
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['bookings-today', organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        console.log('No organization or account context found:', { organizationId, accountId });
        return [];
      }

      const today = new Date().toISOString().split('T')[0];
      console.log('Fetching bookings for date:', today);

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          customer:customers(*),
          asset:assets(*),
          site:sites(*)
        `)
        .eq('check_in_date', today)
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (error) {
        console.error('Error fetching bookings:', error);
        toast.error("Failed to fetch today's bookings");
        throw error;
      }

      console.log('Bookings data received:', data);
      return data as Booking[];
    },
    enabled: !!organizationId && !!accountId
  });

  const handleViewDetails = (booking: Booking) => {
    navigate(`/app/bookings/${booking.id}`);
  };

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-[#133134] text-2xl">Today's Check-ins</CardTitle>
        <BookingsPriorityFilter 
          value={priorityFilter} 
          onChange={setPriorityFilter} 
        />
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