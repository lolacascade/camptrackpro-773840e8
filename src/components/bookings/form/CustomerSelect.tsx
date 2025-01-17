import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Customer } from "@/types/customer";
import { CustomerDrawer } from "@/components/customers/CustomerDrawer";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "cmdk";
import { Input } from "@/components/ui/input";

interface CustomerSelectProps {
  selectedCustomerId: number | null;
  onCustomerSelect: (customerId: number | null) => void;
}

export function CustomerSelect({ selectedCustomerId, onCustomerSelect }: CustomerSelectProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setCustomers(data || []);

      // Set initial search value if customer is selected
      if (selectedCustomerId) {
        const selectedCustomer = data?.find(c => c.id === selectedCustomerId);
        if (selectedCustomer) {
          setSearchValue(selectedCustomer.name);
        }
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleCustomerAdded = () => {
    fetchCustomers();
    setIsDrawerOpen(false);
  };

  const handleSelect = (customerId: string) => {
    const customer = customers.find(c => c.id === parseInt(customerId));
    if (customer) {
      onCustomerSelect(customer.id);
      setSearchValue(customer.name);
      setShowSuggestions(false);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>Customer</Label>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setIsDrawerOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>

      <div className="relative">
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setShowSuggestions(true);
            if (!e.target.value) {
              onCustomerSelect(null);
            }
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search customers..."
          className="w-full"
        />

        {showSuggestions && searchValue && (
          <div className="absolute z-[100] w-full mt-1 bg-white border rounded-md shadow-lg">
            <Command className="border-none bg-white rounded-md">
              <CommandList className="bg-white">
                <CommandEmpty className="p-2">No customers found.</CommandEmpty>
                <CommandGroup className="bg-white">
                  {filteredCustomers.map(customer => (
                    <CommandItem
                      key={customer.id}
                      value={customer.id.toString()}
                      onSelect={handleSelect}
                      className="cursor-pointer hover:bg-gray-100 p-2"
                    >
                      {customer.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        )}
      </div>

      <CustomerDrawer
        customer={null}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onCustomerUpdated={handleCustomerAdded}
      />
    </div>
  );
}