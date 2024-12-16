import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfMonth, subMonths, endOfMonth, addMonths } from "date-fns";
import { CustomerStatsCards } from "../insights/CustomerStatsCards";
import { CustomerLeaseProgress } from "../insights/CustomerLeaseProgress";
import { useParams } from "react-router-dom";
import { Customer } from "@/types/customer";

export function CustomerDetailsInsights() {
  const { id } = useParams();

  const { data: customer, isLoading } = useQuery({
    queryKey: ['customer', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('customers')
        .select(`
          *,
          bookings (
            check_in_date,
            check_out_date
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Customer;
    },
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-48 animate-pulse bg-gray-200 rounded-xl" />
        <div className="h-48 animate-pulse bg-gray-200 rounded-xl" />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No customer data available</p>
      </div>
    );
  }

  // For demonstration, using the most recent booking dates if available
  // or fallback to dummy dates
  const startDate = customer.bookings?.[0]?.check_in_date 
    ? new Date(customer.bookings[0].check_in_date)
    : new Date();
  const endDate = customer.bookings?.[0]?.check_out_date
    ? new Date(customer.bookings[0].check_out_date)
    : addMonths(startDate, 6);

  return (
    <div className="space-y-6">
      <CustomerStatsCards customer={customer} />
      <CustomerLeaseProgress startDate={startDate} endDate={endDate} />
    </div>
  );
}