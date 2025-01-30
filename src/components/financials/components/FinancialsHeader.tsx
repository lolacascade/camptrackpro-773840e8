import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DateRangeFilter } from "./DateRangeFilter";

interface FinancialsHeaderProps {
  onAdd: () => void;
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
}

export function FinancialsHeader({ onAdd, onDateRangeChange }: FinancialsHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-semibold text-[#133134]">Financials</h1>
      <div className="flex items-center gap-4">
        <DateRangeFilter onDateRangeChange={onDateRangeChange} />
        <Button onClick={onAdd} className="bg-[#133134] hover:bg-[#0D2426]">
          <Plus className="w-4 h-4 mr-2" />
          Add Expense
        </Button>
      </div>
    </div>
  );
}