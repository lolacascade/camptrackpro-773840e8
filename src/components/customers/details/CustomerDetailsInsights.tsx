import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CustomerInsights } from "@/components/customers/CustomerInsights";

interface CustomerDetailsInsightsProps {
  customerId: number;  // Changed from string to number to match the type requirement
}

export function CustomerDetailsInsights({ customerId }: CustomerDetailsInsightsProps) {
  const { data: customer } = useQuery({
    queryKey: ['customer', customerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', customerId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="mb-6">
      <CustomerInsights customer={customer} />
    </div>
  );
}