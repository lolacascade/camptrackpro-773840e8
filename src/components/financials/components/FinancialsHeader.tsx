
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DateRangeFilter } from "@/components/financials/components/DateRangeFilter";
import { startOfMonth, endOfMonth, subMonths, startOfYear, endOfYear } from "date-fns";

interface FinancialsHeaderProps {
  onAdd: () => void;
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
}

export function FinancialsHeader({ onAdd, onDateRangeChange }: FinancialsHeaderProps) {
  const handleTimeFrameClick = (timeFrame: string) => {
    const today = new Date();
    let from: Date;
    let to: Date;

    switch (timeFrame) {
      case '1M':
        from = startOfMonth(today);
        to = endOfMonth(today);
        break;
      case '3M':
        from = startOfMonth(subMonths(today, 2));
        to = endOfMonth(today);
        break;
      case '6M':
        from = startOfMonth(subMonths(today, 5));
        to = endOfMonth(today);
        break;
      case '1Y':
        from = startOfMonth(subMonths(today, 11));
        to = endOfMonth(today);
        break;
      case 'ALL':
        from = new Date(2020, 0, 1); // Set a reasonable start date for "ALL"
        to = today;
        break;
      default:
        return;
    }

    onDateRangeChange({ from, to });
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-semibold text-[#133134]">Financials</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleTimeFrameClick('1M')}
            className="bg-white"
          >
            1M
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleTimeFrameClick('3M')}
            className="bg-white"
          >
            3M
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleTimeFrameClick('6M')}
            className="bg-white"
          >
            6M
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleTimeFrameClick('1Y')}
            className="bg-white"
          >
            1Y
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleTimeFrameClick('ALL')}
            className="bg-white"
          >
            ALL
          </Button>
        </div>
        <DateRangeFilter onDateRangeChange={onDateRangeChange} />
        <Button onClick={onAdd} className="bg-[#133134] hover:bg-[#0D2426] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Expense
        </Button>
      </div>
    </div>
  );
}
