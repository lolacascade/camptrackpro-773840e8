import { useEffect, useState } from "react";
import { Customer } from "@/types/customer";
import { CustomerHeader } from "./CustomerHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { CustomerStatsCards } from "../insights/CustomerStatsCards";

interface CustomerDetailsInsightsProps {
  customerId: string;
}

export function CustomerDetailsInsights({ customerId }: CustomerDetailsInsightsProps) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .eq('id', customerId)
          .single();

        if (error) throw error;
        setCustomer(data);
      } catch (error) {
        console.error('Error fetching customer:', error);
        toast({
          title: "Error",
          description: "Failed to load customer details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomer();
  }, [customerId, toast]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!customer) {
    return <div>Customer not found</div>;
  }

  return (
    <div className="space-y-6">
      <CustomerHeader customer={customer} />
      
      <CustomerStatsCards customer={customer} />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Customer Overview</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Email:</span> {customer.email}</p>
              <p><span className="font-medium">Phone:</span> {customer.phone || 'N/A'}</p>
              <p><span className="font-medium">Address:</span> {customer.address || 'N/A'}</p>
              <p><span className="font-medium">City:</span> {customer.city || 'N/A'}</p>
              <p><span className="font-medium">State:</span> {customer.state || 'N/A'}</p>
              <p><span className="font-medium">Country:</span> {customer.country || 'N/A'}</p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Customer History</h3>
            <p>Customer since: {new Date(customer.created_at).toLocaleDateString()}</p>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Customer Preferences</h3>
            <p>Preferences will be displayed here</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}