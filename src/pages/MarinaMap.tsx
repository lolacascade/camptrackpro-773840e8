import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SlipCard } from "@/components/marina/SlipCard";
import { SlipFilters } from "@/components/marina/SlipFilters";
import { SlipStats } from "@/components/marina/SlipStats";
import { BoatDrawer } from "@/components/boats/BoatDrawer";
import { Boat } from "@/types/boat";

export default function MarinaMap() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dockFilter, setDockFilter] = useState("");
  const [selectedBoat, setSelectedBoat] = useState<Boat | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data: slipsData, refetch: refetchSlips } = useQuery({
    queryKey: ['slips'],
    queryFn: async () => {
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

      if (error) throw error;
      return slips;
    },
  });

  const filteredSlips = slipsData?.filter((slip) => {
    const matchesSearch = slip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slip.dock?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || slip.status === statusFilter;
    const matchesDock = !dockFilter || slip.dock === dockFilter;
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

  return (
    <div className="bg-white rounded-[24px] p-12 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#133134]">Marina Map</h1>
      </div>

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
            status={slip.status as 'available' | 'occupied' | 'maintenance'}
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