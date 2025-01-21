import { Customer } from "@/types/customer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CustomerHeaderProps {
  customer: Customer;
}

export function CustomerHeader({ customer }: CustomerHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/app/customers')}
        className="text-[#133134] hover:text-[#133134]/80 -ml-2"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Customers
      </Button>
      
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold text-[#133134]">
            {`${customer.first_name} ${customer.last_name}`}
          </h1>
          <div className="mt-2 text-gray-600">
            <p>{customer.email}</p>
            <p>{customer.phone}</p>
            <p>{customer.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}