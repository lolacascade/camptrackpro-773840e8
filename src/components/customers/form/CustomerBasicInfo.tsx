import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputMask from "react-input-mask";

interface CustomerBasicInfoProps {
  register: any;
  errors: any;
}

export function CustomerBasicInfo({ register, errors }: CustomerBasicInfoProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name *</Label>
          <Input
            id="first_name"
            {...register("first_name", { required: "First name is required" })}
            className={errors.first_name ? "border-red-500" : ""}
          />
          {errors.first_name && (
            <p className="text-sm text-red-500">{errors.first_name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name *</Label>
          <Input
            id="last_name"
            {...register("last_name", { required: "Last name is required" })}
            className={errors.last_name ? "border-red-500" : ""}
          />
          {errors.last_name && (
            <p className="text-sm text-red-500">{errors.last_name.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email"
            }
          })}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <InputMask
          mask="+1 (999) 999-9999"
          {...register("phone")}
        >
          {(inputProps: any) => (
            <Input
              id="phone"
              {...inputProps}
            />
          )}
        </InputMask>
      </div>
    </div>
  );
}