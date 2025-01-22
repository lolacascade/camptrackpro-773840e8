import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CustomerBasicInfoProps {
  register: any;
  errors: any;
}

export function CustomerBasicInfo({ register, errors }: CustomerBasicInfoProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="first_name">First Name</Label>
        <Input id="first_name" {...register('first_name')} className="mt-1" />
      </div>
      
      <div>
        <Label htmlFor="last_name">Last Name</Label>
        <Input id="last_name" {...register('last_name')} className="mt-1" />
      </div>
      
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register('email')} className="mt-1" />
      </div>
      
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" {...register('phone')} className="mt-1" />
      </div>
    </div>
  );
}