import { useParams } from "react-router-dom";
import { CustomerDetailsInsights } from "@/components/customers/details/CustomerDetailsInsights";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Customer } from "@/types/customer";

export default function CustomerDetails() {
  const { id } = useParams();

  const { data: customer, isLoading } = useQuery({
    queryKey: ['customer', id],
    queryFn: async () => {
      if (!id) throw new Error("No customer ID provided");
      
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

  if (!id) {
    return <div>Invalid customer ID</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!customer) {
    return <div>Customer not found</div>;
  }

  return (
    <PageWithChat>
      <PageContainer>
        <CustomerDetailsInsights customer={customer} />
      </PageContainer>
    </PageWithChat>
  );
}