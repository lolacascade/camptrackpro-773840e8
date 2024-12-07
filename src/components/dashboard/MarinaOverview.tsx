import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MarinaChart } from "./MarinaChart";
import { SlipDetails } from "./SlipDetails";

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
        <MarinaChart chartData={chartData} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {slips?.map((slip) => (
            <SlipDetails key={slip.id} slip={slip} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}