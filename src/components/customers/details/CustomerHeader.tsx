import { Customer } from "@/types/customer";

interface CustomerHeaderProps {
  customer: Customer;
}

export function CustomerHeader({ customer }: CustomerHeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-semibold text-[#133134]">{customer.name}</h1>
        <div className="mt-2 text-gray-600">
          <p>{customer.email}</p>
          <p>{customer.phone}</p>
          <p>{customer.address}</p>
        </div>
      </div>
    </div>
  );
}