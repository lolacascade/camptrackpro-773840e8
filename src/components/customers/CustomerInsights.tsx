import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfMonth, subMonths, endOfMonth, addMonths } from "date-fns";
import { CustomerStatsCards } from "./insights/CustomerStatsCards";
import { CustomerLeaseProgress } from "./insights/CustomerLeaseProgress";
import { useParams } from "react-router-dom";
import { Customer } from "@/types/customer";

export function CustomerInsights() {
  const { id } = useParams();

  const { data: customer } = useQuery({
    queryKey: ['customer', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Customer;
    },
    enabled: !!id
  });

  // For demonstration, using dummy dates
  const startDate = new Date();
  const endDate = addMonths(startDate, 6);

  return (
    <div className="space-y-6">
      <CustomerStatsCards customer={customer} />
      <CustomerLeaseProgress startDate={startDate} endDate={endDate} />
    </div>
  );
}