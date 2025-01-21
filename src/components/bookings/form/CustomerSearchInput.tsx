import { Input } from "@/components/ui/input";
import { Customer } from "@/types/customer";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface CustomerSearchInputProps {
  onCustomerSelect: (customer: Customer) => void;
}

export function CustomerSearchInput({ onCustomerSelect }: CustomerSearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data, error } = await supabase
        .from('customers')
        .select('*');

      if (error) {
        console.error('Error fetching customers:', error);
        return;
      }

      const typedCustomers = (data || []).map(customer => ({
        ...customer,
        id: String(customer.id),
        user_id: customer.user_id || null
      }));

      setCustomers(typedCustomers);
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const filtered = customers.filter(customer =>
      `${customer.first_name} ${customer.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [searchTerm, customers]);

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search customers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />
      {searchTerm && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                onCustomerSelect(customer);
                setSearchTerm("");
              }}
            >
              <div className="font-medium">
                {customer.first_name} {customer.last_name}
              </div>
              <div className="text-sm text-gray-600">{customer.email}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}