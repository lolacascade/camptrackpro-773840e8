import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface MarinaHeaderProps {
  onAddDock: () => void;
  title?: string;
}

export function MarinaHeader({ onAddDock, title = "Marina Map" }: MarinaHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-semibold text-[#133134]">{title}</h1>
      <Button 
        className="bg-[#C0CCAB] text-[#0D1D1F] hover:bg-[#C0CCAB]/90"
        onClick={onAddDock}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Site
      </Button>
    </div>
  );
}