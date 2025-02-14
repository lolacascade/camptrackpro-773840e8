
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AssetsHeaderProps {
  onAddAsset: () => void;
}

export function AssetsHeader({ onAddAsset }: AssetsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-semibold text-[#133134]">RVs</h1>
      <Button 
        onClick={onAddAsset}
        className="bg-[#C0CCAB] text-[#0D1D1F] hover:bg-[#C0CCAB]/90"
      >
        <Plus className="mr-2 h-4 w-4" /> Add RV
      </Button>
    </div>
  );
}
