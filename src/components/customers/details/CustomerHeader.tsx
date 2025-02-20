
import { Customer } from "@/types/customer";

interface CustomerHeaderProps {
  customer: Customer;
}

export function CustomerHeader({ customer }: CustomerHeaderProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">
        {customer.first_name} {customer.last_name}
      </h1>
      <div className="text-gray-600">
        <p>Email: {customer.email}</p>
        <p>Phone: {customer.phone}</p>
      </div>
    </div>
  );
}
