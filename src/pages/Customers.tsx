
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Customer } from "@/types/customer";
import { CustomerTable } from "@/components/customers/CustomerTable";
import { CustomerDrawer } from "@/components/customers/CustomerDrawer";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Customers() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toast } = useToast();

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDrawerOpen(true);
  };

  const handleAdd = () => {
    setSelectedCustomer(null);
    setIsDrawerOpen(true);
  };

  const handleCustomerUpdated = () => {
    setIsDrawerOpen(false);
    setSelectedCustomer(null);
    toast({
      title: "Success",
      description: selectedCustomer ? "Customer updated" : "Customer added",
    });
  };

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-3xl font-semibold text-[#133134]">Customers</h1>
            <Button 
              onClick={handleAdd}
              className="bg-[#133134] hover:bg-[#0D2426] text-white w-full sm:w-auto"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Customer
            </Button>
          </div>

          <CustomerTable onEdit={handleEdit} />

          <CustomerDrawer
            customer={selectedCustomer}
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            onCustomerUpdated={handleCustomerUpdated}
          />
        </div>
      </PageContainer>
    </PageWithChat>
  );
}
