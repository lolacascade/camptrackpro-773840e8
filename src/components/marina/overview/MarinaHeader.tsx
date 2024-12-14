import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface MarinaHeaderProps {
  onAddDock: () => void;
}

export function MarinaHeader({ onAddDock }: MarinaHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-semibold text-[#133134]">Marina Map</h1>
      <Button 
        className="bg-[#C0CCAB] text-[#0D1D1F] hover:bg-[#C0CCAB]/90"
        onClick={onAddDock}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Dock
      </Button>
    </div>
  );
}