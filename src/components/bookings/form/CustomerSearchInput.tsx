import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Customer } from "@/types/customer";
import { useState } from "react";

interface CustomerSearchInputProps {
  isLoading: boolean;
  customers: Customer[];
  selectedCustomer: Customer | undefined;
  onCustomerSelect: (customerId: number) => void;
}

export function CustomerSearchInput({
  isLoading,
  customers,
  selectedCustomer,
  onCustomerSelect,
}: CustomerSearchInputProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Label>Customer</Label>
        <Input
          disabled
          value=""
          placeholder="Loading customers..."
          className="w-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label>Customer</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Input
            value={selectedCustomer?.name || searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search customers..."
            className="w-full"
          />
        </PopoverTrigger>
        <PopoverContent className="p-0" align="start">
          <Command>
            <CommandInput 
              placeholder="Search customers..." 
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandEmpty>No customer found.</CommandEmpty>
            {customers.length > 0 && (
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
            )}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}