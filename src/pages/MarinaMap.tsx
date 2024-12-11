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
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AddSlipForm } from "@/components/marina/AddSlipForm";

export default function MarinaMap() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dockFilter, setDockFilter] = useState("all");
  const [selectedBoat, setSelectedBoat] = useState<Boat | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddSlipOpen, setIsAddSlipOpen] = useState(false);

  const { data: slipsData, refetch: refetchSlips, isLoading, error } = useQuery({
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

      if (error) {
        toast({
          title: "Error fetching data",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      return slips as Slip[];
    },
  });

  const handleAddSlip = () => {
    setIsAddSlipOpen(true);
  };

  const handleSlipAdded = async () => {
    setIsAddSlipOpen(false);
    try {
      await refetchSlips();
      toast({
        title: "Success",
        description: "New slip has been added successfully",
      });
    } catch (error) {
      console.error('Error refetching slips:', error);
    }
  };

  if (error) {
    return (
      <div className="bg-white rounded-[24px] p-12">
        <div className="text-center text-red-500">Error loading marina data: {error.message}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-[24px] p-12">
        <div className="text-center text-gray-500">Loading marina data...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[24px] p-12 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#133134]">Marina Map</h1>
        <Button 
          onClick={handleAddSlip}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Slip
        </Button>
      </div>

      <MarinaOverview className="mt-8" />

      <SlipStats 
        totalSlips={slipsData?.length || 0}
        availableSlips={slipsData?.filter(s => s.status === 'available').length || 0}
        occupiedSlips={slipsData?.filter(s => s.status === 'occupied').length || 0}
        maintenanceSlips={slipsData?.filter(s => s.status === 'maintenance').length || 0}
      />

      <SlipFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        dockFilter={dockFilter}
        onDockFilterChange={setDockFilter}
        availableDocks={Array.from(new Set(slipsData?.map(slip => slip.dock).filter(Boolean) || []))}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {slipsData?.filter(slip => {
          const matchesSearch = slip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            slip.dock?.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesStatus = statusFilter === 'all' || slip.status === statusFilter;
          const matchesDock = dockFilter === 'all' || slip.dock === dockFilter;
          return matchesSearch && matchesStatus && matchesDock;
        }).map((slip) => (
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
              try {
                await refetchSlips();
              } catch (error) {
                console.error('Error refetching slips:', error);
              }
            }}
            onEdit={() => {
              setSelectedBoat(slip.boats?.[0] || null);
              setIsDrawerOpen(true);
            }}
          />
        ))}
      </div>

      <Dialog open={isAddSlipOpen} onOpenChange={setIsAddSlipOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Slip</DialogTitle>
          </DialogHeader>
          <AddSlipForm onSuccess={handleSlipAdded} onCancel={() => setIsAddSlipOpen(false)} />
        </DialogContent>
      </Dialog>

      <BoatDrawer
        boat={selectedBoat}
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedBoat(null);
        }}
        onBoatUpdated={async () => {
          try {
            await refetchSlips();
          } catch (error) {
            console.error('Error refetching slips:', error);
          }
        }}
      />
    </div>
  );
}