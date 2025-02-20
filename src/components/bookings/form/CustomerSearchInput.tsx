
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Customer } from "@/types/customer";
import { useOrganization } from "@/hooks/use-organization";

interface CustomerSearchInputProps {
  onSelect: (customer: Customer) => void;
}

export function CustomerSearchInput({ onSelect }: CustomerSearchInputProps) {
  const { organizationId } = useOrganization();

  const { data: customers } = useQuery({
    queryKey: ["customers", organizationId],
    queryFn: async () => {
      if (!organizationId) return [];

      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .eq("organization_id", organizationId);

      if (error) throw error;
      return data as Customer[];
    },
    enabled: !!organizationId
  });

  return (
    <div>
      <select onChange={(e) => {
        const customer = customers?.find(c => c.id === e.target.value);
        if (customer) onSelect(customer);
      }}>
        <option value="">Select a customer</option>
        {customers?.map(customer => (
          <option key={customer.id} value={customer.id}>
            {customer.first_name} {customer.last_name}
          </option>
        ))}
      </select>
    </div>
  );
}
