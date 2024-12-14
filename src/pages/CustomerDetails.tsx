import { useParams } from "react-router-dom";
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
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Customer;
    },
  });

  if (isLoading) {
    return (
      <PageWithChat>
        <PageContainer>
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          </div>
        </PageContainer>
      </PageWithChat>
    );
  }

  if (!customer) {
    return (
      <PageWithChat>
        <PageContainer>
          <div className="text-center py-8">
            <h2 className="text-2xl font-semibold text-gray-700">Customer not found</h2>
          </div>
        </PageContainer>
      </PageWithChat>
    );
  }

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold text-[#133134]">{customer.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-medium text-[#133134]">Contact Information</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Email:</span> {customer.email}</p>
                <p><span className="font-medium">Phone:</span> {customer.phone}</p>
                <p><span className="font-medium">Address:</span> {customer.address}</p>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </PageWithChat>
  );
}