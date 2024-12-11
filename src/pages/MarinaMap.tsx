import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SlipCard } from "@/components/marina/SlipCard";
import { SlipFilters } from "@/components/marina/SlipFilters";
import { SlipStats } from "@/components/marina/SlipStats";
import { MarinaOverview } from "@/components/marina/MarinaOverview";
import { AssetDrawer } from "@/components/assets/AssetDrawer";
import { Asset } from "@/types/asset";
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
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddSlipOpen, setIsAddSlipOpen] = useState(false);

  const { data: slipsData, refetch: refetchSlips, isLoading, error } = useQuery({
    queryKey: ['slips'],
    queryFn: async () => {
      // First fetch slots
      const { data: slots, error: slotsError } = await supabase
        .from('slots')
        .select(`
          *,
          assets (
            id,
            asset_name,
            asset_size,
            customer_id,
            asset_type,
            customers (
              name
            )
          )
        `);

      if (slotsError) {
        toast({
          title: "Error fetching slots",
          description: slotsError.message,
          variant: "destructive",
        });
        throw slotsError;
      }

      // Then fetch maintenance requests separately for each slot
      const slotsWithMaintenance = await Promise.all(
        (slots || []).map(async (slot) => {
          const { data: maintenance, error: maintenanceError } = await supabase
            .from('maintenance_requests')
            .select('description')
            .eq('slot_id', slot.id)
            .order('created_at', { ascending: false })
            .limit(1);

          if (maintenanceError) {
            console.error('Error fetching maintenance for slot:', maintenanceError);
          }

          return {
            ...slot,
            maintenance_requests: maintenance || []
          };
        })
      );

      return slotsWithMaintenance as Slip[];
    },
  });

  const handleAddSlip = () => {
    setIsAddSlipOpen(true);
  };

  const handleSlipAdded = async () => {
    setIsAddSlipOpen(false);
    await refetchSlips();
    toast({
      title: "Success",
      description: "New slip has been added successfully",
    });
  };

  if (error) {
    toast({
      title: "Error fetching data",
      description: "There was an error loading the marina map data. Please try again.",
      variant: "destructive",
    });
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

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
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
              status={slip.status as 'available' | 'occupied' | 'maintenance'}
              asset={slip.assets?.[0]}
              customerName={slip.assets?.[0]?.customers?.name}
              maintenanceDescription={slip.maintenance_requests?.[0]?.description}
              dock={slip.dock}
              onStatusChange={async () => {
                await refetchSlips();
              }}
              onEdit={() => {
                if (slip.assets?.[0]) {
                  setSelectedAsset({
                    ...slip.assets[0],
                    asset_type: slip.assets[0].asset_type || 'boat'
                  });
                  setIsDrawerOpen(true);
                }
              }}
            />
          ))}
        </div>
      )}

      <Dialog open={isAddSlipOpen} onOpenChange={setIsAddSlipOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Slip</DialogTitle>
          </DialogHeader>
          <AddSlipForm 
            onSuccess={handleSlipAdded}
            onCancel={() => setIsAddSlipOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      <AssetDrawer
        asset={selectedAsset}
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedAsset(null);
        }}
        onAssetUpdated={async () => {
          await refetchSlips();
        }}
      />
    </div>
  );
}