import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function MarinaOverview() {
  const { data: slips } = useQuery({
    queryKey: ['slips'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('slips')
        .select('*')
        .order('dock_number', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <Card className="col-span-2 border border-[#E8EBEB] rounded-xl bg-transparent">
      <CardHeader>
        <CardTitle className="text-[#133134]">Marina Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {slips?.map((slip) => (
            <div
              key={slip.id}
              className={`rounded-lg p-4 ${
                slip.status === "occupied"
                  ? "bg-primary/10"
                  : slip.status === "available"
                  ? "bg-success/10"
                  : "bg-warning/10"
              }`}
            >
              <div className="font-bold text-[#133134]">{slip.name}</div>
              <div className="text-base text-[#3E4238]">
                {slip.dock_number} - {slip.power_connection_type || 'No power'}
              </div>
              <div className="mt-1 text-base capitalize text-[#3E4238]">
                {slip.status}
              </div>
              {slip.last_activity_at && (
                <div className="text-sm text-[#3E4238] mt-1">
                  Last activity: {new Date(slip.last_activity_at).toLocaleString()}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}