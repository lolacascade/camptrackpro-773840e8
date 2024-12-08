import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CustomerTable } from "@/components/customers/CustomerTable";
import { CustomerDrawer } from "@/components/customers/CustomerDrawer";
import { Customer } from "@/types/customer";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export default function Customers() {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('name');

      if (error) throw error;

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
    fetchCustomers();
  }, []);

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDrawerOpen(true);
  };

  const handleAdd = () => {
    setSelectedCustomer(null);
    setIsDrawerOpen(true);
  };

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="flex-1 p-12">
          <div className="bg-transparent rounded-[24px] space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-[#133134]">Customers</h1>
              <Button onClick={handleAdd}>
                <Plus className="mr-2 h-4 w-4" /> Add Customer
              </Button>
            </div>

            {isLoading ? (
              <div className="text-[#3E4238]">Loading customers...</div>
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
        </div>
      </div>
    </Layout>
  );
}