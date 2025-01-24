import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { AddDockSpotDialog } from "@/components/marina/dock-spot-dialog/AddDockSpotDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { getSlotColumns } from "@/components/marina/table/SlotTableColumns";
import { useToast } from "@/components/ui/use-toast";
import { Slot } from "@/types/slot";

export default function Sitemap() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['marina-stats'],
    queryFn: async () => {
      const { data: slots, error } = await supabase
        .from('slots')
        .select('*');

      if (error) {
        toast({
          title: "Error fetching marina stats",
          description: error.message,
          variant: "destructive",
        });
        return null;
      }

      const totalSlots = slots?.length || 0;
      const occupiedSlots = slots?.filter(slot => slot.status === 'occupied').length || 0;
      const maintenanceSlots = slots?.filter(slot => slot.status === 'maintenance').length || 0;
      const occupancyRate = totalSlots > 0 ? Math.round((occupiedSlots / totalSlots) * 100) : 0;

      return {
        totalSlots,
        occupiedSlots,
        maintenanceSlots,
        occupancyRate
      };
    }
  });

  const { data: slots = [], isLoading: slotsLoading } = useQuery<Slot[]>({
    queryKey: ['slots'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('slots')
        .select('*');

      if (error) {
        toast({
          title: "Error fetching slots",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data || [];
    }
  });

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-[#133134]">Sitemap</h1>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="bg-[#C0CCAB] text-[#0D1D1F] hover:bg-[#C0CCAB]/90"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Spot
            </Button>
          </div>
          
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Sites</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalSlots || 0}</div>
                <p className="text-sm text-muted-foreground">
                  {stats?.occupiedSlots || 0} occupied, {stats?.maintenanceSlots || 0} in maintenance
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Site Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-sm text-muted-foreground">
                  5% increase from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Most Booked Site</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Dock A-12</div>
                <p className="text-sm text-muted-foreground">
                  15 bookings this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Occupancy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.occupancyRate || 0}%</div>
                <p className="text-sm text-muted-foreground">
                  8% increase from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <DataTable<Slot>
            columns={getSlotColumns()}
            data={slots}
            isLoading={slotsLoading}
            tableName="slots"
          />
        </div>

        <AddDockSpotDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onDockSpotAdded={() => {
            setIsDialogOpen(false);
            // Refresh the data
            window.location.reload();
          }}
        />
      </PageContainer>
    </PageWithChat>
  );
}