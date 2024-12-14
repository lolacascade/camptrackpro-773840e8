import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface FinancialsHeaderProps {
  onAdd: () => void;
}

export function FinancialsHeader({ onAdd }: FinancialsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-semibold text-[#133134]">Financial Overview</h1>
      <Button 
        onClick={onAdd}
        className="bg-[#C0CCAB] text-[#0D1D1F] hover:bg-[#C0CCAB]/90"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Expense
      </Button>
    </div>
  );
}