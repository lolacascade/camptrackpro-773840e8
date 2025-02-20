
import { Customer } from "@/types/customer";
import { Card } from "@/components/ui/card";
import { BookingsTab } from "./tabs/BookingsTab";
import { AssetsTab } from "./tabs/AssetsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CustomerDetailsInsightsProps {
  customer: Customer;
}

export function CustomerDetailsInsights({ customer }: CustomerDetailsInsightsProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p>{customer.email || 'No email provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p>{customer.phone || 'No phone provided'}</p>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="bookings" className="w-full">
        <TabsList>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="assets">RVs</TabsTrigger>
        </TabsList>
        <TabsContent value="bookings">
          <BookingsTab customerId={customer.id} />
        </TabsContent>
        <TabsContent value="assets">
          <AssetsTab customerId={customer.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
