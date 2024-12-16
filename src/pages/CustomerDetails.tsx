import { CustomerHeader } from "@/components/customers/details/CustomerHeader";
import { CustomerDetailsInsights } from "@/components/customers/details/CustomerDetailsInsights";
import { PageContainer } from "@/components/layout/PageContainer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useParams } from "react-router-dom";
import { Customer } from "@/types/customer";

export default function CustomerDetails() {
  const { id } = useParams();

  const { data: customer, isLoading } = useQuery({
    queryKey: ['customer-details', id],
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

  if (isLoading || !customer) {
    return (
      <PageContainer>
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-6">
        <CustomerHeader customer={customer} />
        <CustomerDetailsInsights />
      </div>
    </PageContainer>
  );
}