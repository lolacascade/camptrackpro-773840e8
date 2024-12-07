import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DashboardFilters } from "./DashboardFilters";
import { useState } from "react";

export function MarinaOverview() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dockFilter, setDockFilter] = useState("all");

  const { data: slips } = useQuery({
    queryKey: ['slips'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('slips')
        .select('*, boats(*, customers(name))')
        .order('dock_number', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const availableDocks = Array.from(
    new Set(slips?.map((slip) => slip.dock) || [])
  ).filter(Boolean);

  const filteredSlips = slips?.filter((slip) => {
    const matchesSearch = slip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slip.dock?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDock = dockFilter === "all" || slip.dock === dockFilter;
    return matchesSearch && matchesDock;
  });

  return (
    <Card className="col-span-2 border border-[#E8EBEB] rounded-xl bg-transparent">
      <CardHeader>
        <CardTitle className="text-[#133134]">Marina Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <DashboardFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          dockFilter={dockFilter}
          onDockFilterChange={setDockFilter}
          availableDocks={availableDocks}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSlips?.map((slip) => (
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
                </TooltipTrigger>
                <TooltipContent>
                  <div className="space-y-2">
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