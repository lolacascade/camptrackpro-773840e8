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
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const session = useSession();

  const fetchCustomers = async () => {
    try {
      console.log('Fetching customers...');
      if (!session?.user?.id) {
        console.log('No user session found');
        return;
      }

      // Remove the user_id filter to see all customers during development
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching customers:', error);
        throw error;
      }

      console.log('Customers data:', data);
      setCustomers(data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast({
        title: "Error",
        description: "Failed to load customers.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchCustomers();
    }
  }, [session]);

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
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-[#133134]">Customers</h1>
            <Button onClick={handleAdd}>
              <Plus className="mr-2 h-4 w-4" /> Add Customer
            </Button>
          </div>

          <CustomerInsights />

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <CustomerTable
              customers={customers}
              onEdit={handleEdit}
            />
          )}

          <CustomerDrawer
            customer={selectedCustomer}
            open={isDrawerOpen}
            onClose={() => {
              setIsDrawerOpen(false);
              setSelectedCustomer(null);
            }}
            onCustomerUpdated={fetchCustomers}
          />
        </div>
      </PageContainer>
    </PageWithChat>
  );
}