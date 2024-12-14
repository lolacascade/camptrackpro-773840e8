import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { MarinaChart } from "@/components/marina/chart/MarinaChart";
import { format, subMonths, addMonths } from "date-fns";
import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { Anchor, Ship, ArrowRightLeft, Activity } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function MarinaMap() {
  const [selectedDock, setSelectedDock] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: marinaStats } = useQuery({
    queryKey: ['marina-stats'],
    queryFn: async () => {
      const today = new Date().toISOString();
      const [slotsData, bookingsData] = await Promise.all([
        supabase.from('slots').select('status'),
        supabase.from('bookings')
          .select('*')
          .gte('check_in_date', today)
          .lte('check_in_date', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString())
      ]);

      const totalSlots = slotsData.data?.length || 0;
      const availableSlots = slotsData.data?.filter(slot => slot.status === 'available').length || 0;
      const maintenanceSlots = slotsData.data?.filter(slot => slot.status === 'maintenance').length || 0;
      const occupiedSlots = totalSlots - availableSlots - maintenanceSlots;
      const upcomingArrivals = bookingsData.data?.length || 0;

      return {
        totalSlots,
        availableSlots,
        maintenanceSlots,
        occupiedSlots,
        occupancyRate: Math.round((occupiedSlots / totalSlots) * 100),
        upcomingArrivals
      };
    }
  });

  // Generate sample data for the chart
  const generateMonthlyData = () => {
    const currentDate = new Date();
    const data = [];
    for (let i = -12; i <= 2; i++) {
      const date = i === 0 ? currentDate : (i < 0 ? subMonths(currentDate, Math.abs(i)) : addMonths(currentDate, i));
      const isProjected = i > 0;
      
      let occupied = Math.floor(Math.random() * 30) + 20;
      let available = Math.floor(Math.random() * 20) + 10;
      let maintenance = Math.floor(Math.random() * 10) + 5;
      
      if (isProjected) {
        const growthRate = 1.05;
        occupied = Math.floor(occupied * growthRate);
        available = Math.floor(available * growthRate);
        maintenance = Math.floor(maintenance * growthRate);
      }
      
      data.push({
        date,
        month: format(date, 'MMM'),
        year: format(date, 'yyyy'),
        occupied,
        available,
        maintenance,
        isProjected
      });
    }
    return data;
  };

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-[#133134]">Marina Map</h1>
            <Button 
              className="bg-[#C0CCAB] text-[#0D1D1F] hover:bg-[#C0CCAB]/90"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Dock
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <EnhancedStatCard
              title="Total Docks"
              value={`${marinaStats?.totalSlots || 0}`}
              icon={Anchor}
              trend={{
                value: "2 new",
                isPositive: true,
                comparedTo: "last month"
              }}
              breakdown={[
                { 
                  label: "Available", 
                  value: String(marinaStats?.availableSlots || 0), 
                  percentage: Math.round(((marinaStats?.availableSlots || 0) / (marinaStats?.totalSlots || 1)) * 100) 
                },
                { 
                  label: "Maintenance", 
                  value: String(marinaStats?.maintenanceSlots || 0),
                  percentage: Math.round(((marinaStats?.maintenanceSlots || 0) / (marinaStats?.totalSlots || 1)) * 100)
                }
              ]}
            />
            <EnhancedStatCard
              title="Current Occupancy"
              value={`${marinaStats?.occupancyRate || 0}%`}
              icon={Ship}
              trend={{
                value: "2%",
                isPositive: true,
                comparedTo: "last week"
              }}
              breakdown={[
                { label: "Occupied Slips", value: String(marinaStats?.occupiedSlots || 0), percentage: marinaStats?.occupancyRate || 0 },
                { label: "Available Slips", value: String(marinaStats?.availableSlots || 0), percentage: 100 - (marinaStats?.occupancyRate || 0) }
              ]}
            />
            <EnhancedStatCard
              title="Upcoming Activity"
              value={String(marinaStats?.upcomingArrivals || 0)}
              icon={ArrowRightLeft}
              trend={{
                value: "3 more",
                isPositive: true,
                comparedTo: "last week"
              }}
              breakdown={[
                { label: "Arrivals", value: String(marinaStats?.upcomingArrivals || 0), percentage: 60 },
                { label: "Departures", value: "8", percentage: 40 }
              ]}
            />
            <EnhancedStatCard
              title="Dock Utilization"
              value="65%"
              icon={Activity}
              trend={{
                value: "5%",
                isPositive: true,
                comparedTo: "last month"
              }}
              breakdown={[
                { label: "Long-term", value: "70%", percentage: 70 },
                { label: "Short-term", value: "50%", percentage: 50 }
              ]}
            />
          </div>

          <Card className="border border-[#E8EBEB] bg-transparent">
            <CardContent className="p-6">
              <MarinaChart chartData={generateMonthlyData()} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="aspect-[16/9] bg-[#F8F9FA] rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Interactive marina map will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </PageWithChat>
  );
}