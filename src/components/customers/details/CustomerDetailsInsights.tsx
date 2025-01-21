import { useEffect, useState } from "react";
import { Customer } from "@/types/customer";
import { CustomerHeader } from "../CustomerHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { AssetsTab } from "./tabs/AssetsTab";
import { NotesTab } from "./tabs/NotesTab";

interface CustomerDetailsInsightsProps {
  customer: Customer;
}

export function CustomerDetailsInsights({ customer }: CustomerDetailsInsightsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <CustomerHeader customer={customer} />

      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <div className="mt-4">
            <TabsContent value="overview">
              <div className="grid gap-4">
                <div>
                  <h3 className="text-lg font-medium">Contact Information</h3>
                  <div className="mt-2 space-y-2">
                    <p>Email: {customer.email}</p>
                    <p>Phone: {customer.phone || 'Not provided'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium">Address</h3>
                  <div className="mt-2 space-y-2">
                    <p>{customer.address || 'No address provided'}</p>
                    <p>
                      {customer.city} {customer.state} {customer.postal_code}
                    </p>
                    <p>{customer.country}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="assets">
              <AssetsTab customer={customer} />
            </TabsContent>

            <TabsContent value="notes">
              <NotesTab customer={customer} />
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  );
}