import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Customer } from "@/types/customer";

interface CustomerAddressProps {
  register: any;
  defaultValues?: Customer;
}

export function CustomerAddress({ register, defaultValues }: CustomerAddressProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="address">Address</Label>
        <Input 
          id="address" 
          {...register('address')} 
          defaultValue={defaultValues?.address}
          className="mt-1" 
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input 
            id="city" 
            {...register('city')} 
            defaultValue={defaultValues?.city}
            className="mt-1" 
          />
        </div>
        
        <div>
          <Label htmlFor="state">State</Label>
          <Input 
            id="state" 
            {...register('state')} 
            defaultValue={defaultValues?.state}
            className="mt-1" 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="country">Country</Label>
          <Input 
            id="country" 
            {...register('country')} 
            defaultValue={defaultValues?.country}
            className="mt-1" 
          />
        </div>
        
        <div>
          <Label htmlFor="postal_code">Postal Code</Label>
          <Input 
            id="postal_code" 
            {...register('postal_code')} 
            defaultValue={defaultValues?.postal_code}
            className="mt-1" 
          />
        </div>
      </div>
    </div>
  );
}