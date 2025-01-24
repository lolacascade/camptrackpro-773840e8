import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StatsGrid } from "@/components/common/StatsGrid";
import { useOrganization } from "@/hooks/use-organization";

export function CustomerStatsGrid() {
  const { organizationId, accountId } = useOrganization();

  const { data: stats } = useQuery({
    queryKey: ['customer-stats', organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) return null;

      const { data: customers } = await supabase
        .from('customers')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      const { data: bookings } = await supabase
        .from('bookings')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

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
    },
    enabled: !!organizationId && !!accountId
  });

  if (!stats) return null;

  return (
    <StatsGrid
      occupancyRate={Math.round((stats.activeBookings / stats.totalCustomers) * 100) || 0}
      occupiedSlips={stats.activeBookings}
      totalSlips={stats.totalCustomers}
      activeBoats={stats.newThisMonth}
      monthlyRevenue={stats.totalRevenue}
      pendingMaintenance={0}
    />
  );
}