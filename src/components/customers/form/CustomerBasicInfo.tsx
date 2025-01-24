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
        <Label htmlFor="first_name" className="flex items-center">
          First Name <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input 
          id="first_name" 
          {...register('first_name', { 
            required: 'First name is required' 
          })} 
          className="mt-1" 
        />
        {errors.first_name && (
          <p className="text-sm text-red-500 mt-1">{errors.first_name.message}</p>
        )}
      </div>
      
      <div>
        <Label htmlFor="last_name" className="flex items-center">
          Last Name <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input 
          id="last_name" 
          {...register('last_name', { 
            required: 'Last name is required' 
          })} 
          className="mt-1" 
        />
        {errors.last_name && (
          <p className="text-sm text-red-500 mt-1">{errors.last_name.message}</p>
        )}
      </div>
      
      <div>
        <Label htmlFor="email" className="flex items-center">
          Email <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input 
          id="email" 
          type="email" 
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })} 
          className="mt-1" 
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>
      
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input 
          id="phone" 
          {...register('phone')} 
          className="mt-1" 
        />
      </div>

      <div>
        <Label htmlFor="lifetime_value">Lifetime Value</Label>
        <Input 
          id="lifetime_value" 
          {...register('lifetime_value')} 
          className="mt-1" 
        />
      </div>
    </div>
  );
}