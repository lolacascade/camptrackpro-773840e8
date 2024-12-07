import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

export function MarinaOverview() {
  const { data: slips, isError, error } = useQuery({
    queryKey: ['slips'],
    queryFn: async () => {
      console.log('Fetching slips data...');
      const { data, error } = await supabase
        .from('slips')
        .select('*, boats(*, customers(name))')
        .order('dock_number', { ascending: true });
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Slips data received:', data);
      return data || [];
    },
  });

  if (isError) {
    console.error('Query error:', error);
    return (
      <Card className="col-span-2 border border-[#E8EBEB] rounded-xl bg-transparent">
        <CardHeader>
          <CardTitle className="text-[#133134] text-base">Marina Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-base text-[#133134]">Error loading marina data. Please try again later.</div>
        </CardContent>
      </Card>
    );
  }

  // Process data for the chart
  const dockStats = slips?.reduce((acc: any, slip) => {
    const dock = slip.dock || 'Unassigned';
    if (!acc[dock]) {
      acc[dock] = {
        dock,
        total: 0,
        occupied: 0,
        available: 0,
        maintenance: 0
      };
    }
    acc[dock].total += 1;
    if (slip.status) {
      acc[dock][slip.status] += 1;
    }
    return acc;
  }, {});

  const chartData = Object.values(dockStats || {});

  return (
    <Card className="col-span-2 border border-[#E8EBEB] rounded-xl bg-transparent">
      <CardHeader>
        <CardTitle className="text-[#133134] text-base">Marina Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dock" tick={{ fontSize: 16 }} />
              <YAxis tick={{ fontSize: 16 }} />
              <RechartsTooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-4 rounded-lg shadow-lg border text-base">
                        <p className="font-bold text-[#133134]">{`Dock ${label}`}</p>
                        <p className="text-[#133134]">{`Total Slips: ${payload[0].payload.total}`}</p>
                        <p className="text-[#133134]">{`Occupied: ${payload[0].payload.occupied}`}</p>
                        <p className="text-[#133134]">{`Available: ${payload[0].payload.available}`}</p>
                        <p className="text-[#133134]">{`Maintenance: ${payload[0].payload.maintenance}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="total"
                fill="#C0CCAB"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {slips?.map((slip) => (
            <TooltipProvider key={slip.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`rounded-lg p-4 cursor-help ${
                      slip.status === "occupied"
                        ? "bg-primary/10"
                        : slip.status === "available"
                        ? "bg-success/10"
                        : "bg-warning/10"
                    }`}
                  >
                    <div className="font-bold text-[#133134] text-base">{slip.name}</div>
                    <div className="text-base text-[#3E4238]">
                      {slip.dock_number} - {slip.power_connection_type || 'No power'}
                    </div>
                    <div className="mt-1 text-base capitalize text-[#3E4238]">
                      {slip.status}
                    </div>
                    {slip.last_activity_at && (
                      <div className="text-base text-[#3E4238] mt-1">
                        Last activity: {new Date(slip.last_activity_at).toLocaleString()}
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-2 text-base">
                    <p><strong>Status:</strong> {slip.status}</p>
                    <p><strong>Power:</strong> {slip.power_connection_type || 'None'}</p>
                    {slip.boats?.[0] && (
                      <>
                        <p><strong>Boat:</strong> {slip.boats[0].boat_name}</p>
                        <p><strong>Owner:</strong> {slip.boats[0].customers?.name}</p>
                      </>
                    )}
                    <p><strong>Last Activity:</strong> {slip.last_activity_at 
                      ? new Date(slip.last_activity_at).toLocaleString()
                      : 'No recent activity'}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}