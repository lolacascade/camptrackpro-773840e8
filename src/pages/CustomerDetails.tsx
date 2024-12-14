import { useParams } from "react-router-dom";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Customer } from "@/types/customer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomerInsights } from "@/components/customers/CustomerInsights";
import { CustomerHeader } from "@/components/customers/details/CustomerHeader";
import { BookingsTab } from "@/components/customers/details/tabs/BookingsTab";
import { MaintenanceTab } from "@/components/customers/details/tabs/MaintenanceTab";
import { AssetsTab } from "@/components/customers/details/tabs/AssetsTab";
import { NotesTab } from "@/components/customers/details/tabs/NotesTab";

export default function CustomerDetails() {
  const { id } = useParams();

  const { data: customer, isLoading: isLoadingCustomer } = useQuery({
    queryKey: ['customer', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Customer;
    },
  });

  const { data: bookings, isLoading: isLoadingBookings } = useQuery({
    queryKey: ['customer-bookings', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          slot:slots(name),
          customer:customers(name, email)
        `)
        .eq('customer_id', id)
        .order('check_in_date', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const { data: maintenanceRequests, isLoading: isLoadingMaintenance } = useQuery({
    queryKey: ['customer-maintenance', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('maintenance_requests')
        .select(`
          *,
          slot:slots(name)
        `)
        .eq('customer_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const { data: assets, isLoading: isLoadingAssets } = useQuery({
    queryKey: ['customer-assets', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .eq('customer_id', id);

      if (error) throw error;
      return data;
    },
  });

  const { data: notes, isLoading: isLoadingNotes } = useQuery({
    queryKey: ['customer-notes', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customer_notes')
        .select('*')
        .eq('customer_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoadingCustomer) {
    return (
      <PageWithChat>
        <PageContainer>
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          </div>
        </PageContainer>
      </PageWithChat>
    );
  }

  if (!customer) {
    return (
      <PageWithChat>
        <PageContainer>
          <div className="text-center py-8">
            <h2 className="text-2xl font-semibold text-gray-700">Customer not found</h2>
          </div>
        </PageContainer>
      </PageWithChat>
    );
  }

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <CustomerHeader customer={customer} />
          <CustomerInsights />

          <Tabs defaultValue="bookings" className="w-full">
            <TabsList>
              <TabsTrigger value="bookings">Bookings ({bookings?.length || 0})</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance ({maintenanceRequests?.length || 0})</TabsTrigger>
              <TabsTrigger value="assets">Assets ({assets?.length || 0})</TabsTrigger>
              <TabsTrigger value="notes">Notes ({notes?.length || 0})</TabsTrigger>
            </TabsList>

            <TabsContent value="bookings">
              <BookingsTab bookings={bookings || []} isLoading={isLoadingBookings} />
            </TabsContent>

            <TabsContent value="maintenance">
              <MaintenanceTab maintenanceRequests={maintenanceRequests || []} isLoading={isLoadingMaintenance} />
            </TabsContent>

            <TabsContent value="assets">
              <AssetsTab assets={assets || []} isLoading={isLoadingAssets} />
            </TabsContent>

            <TabsContent value="notes">
              <NotesTab notes={notes || []} isLoading={isLoadingNotes} />
            </TabsContent>
          </Tabs>
        </div>
      </PageContainer>
    </PageWithChat>
  );
}