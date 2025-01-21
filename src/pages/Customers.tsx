import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CustomerTable } from "@/components/customers/CustomerTable";
import { CustomerDrawer } from "@/components/customers/CustomerDrawer";
import { CustomerInsights } from "@/components/customers/CustomerInsights";
import { Customer } from "@/types/customer";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from '@supabase/auth-helpers-react';
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";

export default function Customers() {
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const session = useSession();

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDrawerOpen(true);
  };

  const handleAdd = () => {
    setSelectedCustomer(null);
    setIsDrawerOpen(true);
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

          <CustomerInsights customer={selectedCustomer} />

          <CustomerTable
            onEdit={handleEdit}
          />

          <CustomerDrawer
            customer={selectedCustomer}
            open={isDrawerOpen}
            onClose={() => {
              setIsDrawerOpen(false);
              setSelectedCustomer(null);
            }}
            onCustomerUpdated={() => {
              setIsDrawerOpen(false);
              setSelectedCustomer(null);
            }}
          />
        </div>
      </PageContainer>
    </PageWithChat>
  );
}