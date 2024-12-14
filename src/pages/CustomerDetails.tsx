import { useParams } from "react-router-dom";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Customer } from "@/types/customer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerInsights } from "@/components/customers/CustomerInsights";

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

  if (isLoadingCustomer || isLoadingBookings || isLoadingMaintenance || isLoadingAssets || isLoadingNotes) {
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

          <CustomerInsights />

          <Tabs defaultValue="bookings" className="w-full">
            <TabsList>
              <TabsTrigger value="bookings">Bookings ({bookings?.length || 0})</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance ({maintenanceRequests?.length || 0})</TabsTrigger>
              <TabsTrigger value="assets">Assets ({assets?.length || 0})</TabsTrigger>
              <TabsTrigger value="notes">Notes ({notes?.length || 0})</TabsTrigger>
            </TabsList>

            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Booking History</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataTable
                    data={bookings || []}
                    columns={[
                      { 
                        header: "Slot",
                        accessorKey: "slot.name"
                      },
                      {
                        header: "Check In",
                        accessorKey: "check_in_date",
                        cell: (item) => new Date(item.check_in_date).toLocaleDateString()
                      },
                      {
                        header: "Check Out",
                        accessorKey: "check_out_date",
                        cell: (item) => new Date(item.check_out_date).toLocaleDateString()
                      },
                      {
                        header: "Status",
                        accessorKey: "status"
                      },
                      {
                        header: "Reservation",
                        accessorKey: "reservation_code"
                      }
                    ]}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="maintenance">
              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataTable
                    data={maintenanceRequests || []}
                    columns={[
                      { header: "Description", accessorKey: "description" },
                      { header: "Status", accessorKey: "status" },
                      { header: "Priority", accessorKey: "priority" },
                      {
                        header: "Created",
                        accessorKey: "created_at",
                        cell: (item) => new Date(item.created_at).toLocaleDateString()
                      }
                    ]}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assets">
              <Card>
                <CardHeader>
                  <CardTitle>Assets</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataTable
                    data={assets || []}
                    columns={[
                      { header: "Name", accessorKey: "asset_name" },
                      { header: "Type", accessorKey: "asset_type" },
                      { header: "Size", accessorKey: "asset_size" }
                    ]}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataTable
                    data={notes || []}
                    columns={[
                      { header: "Note", accessorKey: "note" },
                      { header: "Tag", accessorKey: "tag" },
                      {
                        header: "Created",
                        accessorKey: "created_at",
                        cell: (item) => new Date(item.created_at).toLocaleDateString()
                      }
                    ]}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </PageContainer>
    </PageWithChat>
  );
}
