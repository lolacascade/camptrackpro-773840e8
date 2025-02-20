
import { useRVs } from "@/hooks/rvs/use-rvs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { RV } from "@/types/rv";
import { RVDrawer } from "@/components/rvs/RVDrawer";
import { useToast } from "@/hooks/use-toast";
import { RVTable } from "@/components/rvs/table/RVTable";

export function RVsContent() {
  const { data: rvs = [], isLoading, error } = useRVs();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRV, setSelectedRV] = useState<RV | null>(null);
  const { toast } = useToast();

  const handleAddRV = () => {
    setSelectedRV(null);
    setIsDrawerOpen(true);
  };

  const handleEditRV = (rv: RV) => {
    setSelectedRV(rv);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedRV(null);
  };

  const handleSuccess = () => {
    handleCloseDrawer();
    toast({
      title: "Success",
      description: selectedRV ? "RV updated successfully" : "RV added successfully",
    });
  };

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        Error loading RVs. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-[#133134]">RVs</h1>
        <Button 
          onClick={handleAddRV}
          className="bg-[#C0CCAB] text-[#0D1D1F] hover:bg-[#C0CCAB]/90"
        >
          <Plus className="mr-2 h-4 w-4" /> Add RV
        </Button>
      </div>

      <RVTable
        rvs={rvs}
        onEdit={handleEditRV}
        isLoading={isLoading}
      />

      <RVDrawer
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        onRVAdded={handleSuccess}
        rv={selectedRV || undefined}
      />
    </div>
  );
}
