
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "@/services/BookingService";
import { useOrganization } from "@/hooks/use-organization";
import { BookingFilters } from "@/types/booking";

interface UseBookingsProps {
  filters: BookingFilters;
}

export function useBookings({ filters }: UseBookingsProps) {
  const { organizationId, accountId } = useOrganization();

  return useQuery({
    queryKey: ["bookings", organizationId, accountId, filters],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        return {
          data: [],
          total: 0
        };
      }

      const data = await getBookings({
        organizationId,
        accountId,
        status: filters.status,
        searchTerm: filters.searchTerm,
        dateRange: filters.dateRange
      });

      return {
        data,
        total: data.length
      };
    },
    enabled: !!organizationId && !!accountId
  });
}
