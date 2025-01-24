import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Customer } from "@/types/customer";
import { CustomerTable } from "@/components/customers/CustomerTable";
import { CustomerDrawer } from "@/components/customers/CustomerDrawer";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { StatsGrid } from "@/components/common/StatsGrid";

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
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-[#133134]">Customers</h1>
            <Button 
              onClick={handleAdd}
              className="bg-[#C0CCAB] text-[#0D1D1F] hover:bg-[#C0CCAB]/90"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Customer
            </Button>
          </div>

          <StatsGrid
            occupancyRate={85}
            occupiedSlips={17}
            totalSlips={20}
            activeBoats={15}
            monthlyRevenue={45000}
            pendingMaintenance={8}
          />

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