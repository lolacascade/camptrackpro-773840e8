import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SlipCard } from "@/components/marina/SlipCard";
import { SlipFilters } from "@/components/marina/SlipFilters";
import { SlipStats } from "@/components/marina/SlipStats";
import { MarinaOverview } from "@/components/marina/MarinaOverview";
import { BoatDrawer } from "@/components/boats/BoatDrawer";
import { Boat } from "@/types/boat";
import { Slip } from "@/types/slip";
import { useToast } from "@/components/ui/use-toast";

export default function MarinaMap() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dockFilter, setDockFilter] = useState("all");
  const [selectedBoat, setSelectedBoat] = useState<Boat | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data: slipsData, refetch: refetchSlips, isLoading, error } = useQuery<Slip[]>({
    queryKey: ['slips'],
    queryFn: async () => {
      console.log('Starting slip data fetch...');
      const { data: slips, error } = await supabase
        .from('slips')
        .select(`
          *,
          boats (
            id,
            boat_name,
            boat_size,
            customer_id,
            slip_id,
            created_at,
            updated_at,
            customers (
              name
            )
          ),
          maintenance_requests!fk_slip_id (
            description
          )
        `);

      if (error) {
        console.error('Supabase error fetching slips:', error);
        toast({
          title: "Error fetching data",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      if (!slips || slips.length === 0) {
        console.log('No slips found in the database');
        const sampleSlips = [
          {
            name: 'Slip A1',
            status: 'available' as const,
            dock: 'A',
            dock_number: 'A1',
          },
          {
            name: 'Slip A2',
            status: 'occupied' as const,
            dock: 'A',
            dock_number: 'A2',
          },
          {
            name: 'Slip B1',
            status: 'maintenance' as const,
            dock: 'B',
            dock_number: 'B1',
          }
        ];

        console.log('Inserting sample slips...');
        const { data: insertedSlips, error: insertError } = await supabase
          .from('slips')
          .insert(sampleSlips)
          .select();

        if (insertError) {
          console.error('Error inserting sample slips:', insertError);
          toast({
            title: "Error creating sample data",
            description: insertError.message,
            variant: "destructive",
          });
          throw insertError;
        }

        console.log('Sample slips inserted:', insertedSlips);
        return insertedSlips as Slip[];
      }

      console.log('Slips fetched successfully:', slips);
      return slips as Slip[];
    },
  });

  if (error) {
    console.error('Query error:', error);
    return (
      <div className="bg-white rounded-[24px] p-12">
        <div className="text-center text-red-500">Error loading marina data: {error.message}</div>
      </div>
    );
  }

  const filteredSlips = slipsData?.filter((slip) => {
    const matchesSearch = slip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slip.dock?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || slip.status === statusFilter;
    const matchesDock = dockFilter === 'all' || slip.dock === dockFilter;
    
    return matchesSearch && matchesStatus && matchesDock;
  });

  const availableDocks = Array.from(
    new Set(slipsData?.map((slip) => slip.dock).filter((dock): dock is string => typeof dock === 'string') || [])
  );

  const stats = {
    totalSlips: slipsData?.length || 0,
    availableSlips: slipsData?.filter(s => s.status === 'available').length || 0,
    occupiedSlips: slipsData?.filter(s => s.status === 'occupied').length || 0,
    maintenanceSlips: slipsData?.filter(s => s.status === 'maintenance').length || 0,
  };

  const handleEditBoat = (boat: Boat | null) => {
    setSelectedBoat(boat);
    setIsDrawerOpen(true);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-[24px] p-12">
        <div className="text-center text-gray-500">Loading marina data...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[24px] p-12 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#133134]">Marina Map</h1>
      </div>

      <MarinaOverview />

      <SlipStats {...stats} />

      <SlipFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        dockFilter={dockFilter}
        onDockFilterChange={setDockFilter}
        availableDocks={availableDocks}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSlips?.map((slip) => (
          <SlipCard
            key={slip.id}
            id={slip.id}
            name={slip.name}
            status={slip.status}
            boat={slip.boats?.[0]}
            customerName={slip.boats?.[0]?.customers?.name}
            maintenanceDescription={slip.maintenance_requests?.[0]?.description}
            dock={slip.dock}
            onStatusChange={async () => {
              await refetchSlips();
            }}
            onEdit={() => handleEditBoat(slip.boats?.[0] || null)}
          />
        ))}
      </div>

      <BoatDrawer
        boat={selectedBoat}
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedBoat(null);
        }}
        onBoatUpdated={async () => {
          await refetchSlips();
        }}
      />
    </div>
  );
}