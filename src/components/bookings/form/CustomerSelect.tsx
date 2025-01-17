import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Customer } from "@/types/customer";
import { CustomerDrawer } from "@/components/customers/CustomerDrawer";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface CustomerSelectProps {
  selectedCustomerId: number | null;
  onCustomerSelect: (customerId: number | null) => void;
}

export function CustomerSelect({ selectedCustomerId, onCustomerSelect }: CustomerSelectProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setCustomers(data || []);
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

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);

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
          <Input
            disabled={isLoading}
            value={selectedCustomer?.name || searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search customers..."
            className="w-full"
          />
        </PopoverTrigger>
        {customers.length > 0 && (
          <PopoverContent className="p-0" align="start">
            <Command>
              <CommandInput 
                placeholder="Search customers..." 
                value={searchValue}
                onValueChange={setSearchValue}
              />
              <CommandEmpty>No customer found.</CommandEmpty>
              <CommandGroup>
                {customers
                  .filter(customer => 
                    customer.name.toLowerCase().includes(searchValue.toLowerCase())
                  )
                  .map((customer) => (
                    <CommandItem
                      key={customer.id}
                      onSelect={() => {
                        onCustomerSelect(customer.id);
                        setSearchValue(customer.name);
                        setOpen(false);
                      }}
                    >
                      {customer.name}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        )}
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