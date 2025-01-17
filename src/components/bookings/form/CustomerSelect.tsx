import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Customer } from "@/types/customer";
import { CustomerDrawer } from "@/components/customers/CustomerDrawer";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "cmdk";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface CustomerSelectProps {
  selectedCustomerId: number | null;
  onCustomerSelect: (customerId: number | null) => void;
}

export function CustomerSelect({ selectedCustomerId, onCustomerSelect }: CustomerSelectProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCustomerName, setSelectedCustomerName] = useState("");

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setCustomers(data || []);

      // Set initial selected customer name
      if (selectedCustomerId) {
        const selectedCustomer = data?.find(c => c.id === selectedCustomerId);
        if (selectedCustomer) {
          setSelectedCustomerName(selectedCustomer.name);
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
      setSelectedCustomerName(customer.name);
      setOpen(false);
    }
  };

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

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedCustomerName || "Select customer..."}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search customers..."
              value={searchValue}
              onValueChange={setSearchValue}
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>No customers found.</CommandEmpty>
              <CommandGroup>
                {customers
                  .filter(customer =>
                    customer.name.toLowerCase().includes(searchValue.toLowerCase())
                  )
                  .map(customer => (
                    <CommandItem
                      key={customer.id}
                      value={customer.id.toString()}
                      onSelect={handleSelect}
                    >
                      {customer.name}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <CustomerDrawer
        customer={null}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onCustomerUpdated={handleCustomerAdded}
      />
    </div>
  );
}