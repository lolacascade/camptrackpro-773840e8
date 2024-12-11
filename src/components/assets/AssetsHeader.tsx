import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AssetsHeaderProps {
  onAddAsset: () => void;
}

export function AssetsHeader({ onAddAsset }: AssetsHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-[#133134]">Assets</h1>
      <Button onClick={onAddAsset}>
        <Plus className="mr-2 h-4 w-4" /> Add Asset
      </Button>
    </div>
  );
}