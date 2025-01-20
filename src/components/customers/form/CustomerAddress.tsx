import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CustomerAddressProps {
  register: any;
}

export function CustomerAddress({ register }: CustomerAddressProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          {...register("address")}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            {...register("city")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State/Province</Label>
          <Input
            id="state"
            {...register("state")}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            {...register("country")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="postal_code">Postal/Zip Code</Label>
          <Input
            id="postal_code"
            {...register("postal_code")}
          />
        </div>
      </div>
    </div>
  );
}