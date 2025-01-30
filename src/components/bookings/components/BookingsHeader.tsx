import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DateRangeFilter } from "@/components/financials/components/DateRangeFilter";
import { startOfMonth, endOfMonth, subDays, startOfYear, endOfYear, subMonths } from "date-fns";

interface BookingsHeaderProps {
  onAdd: () => void;
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
}

export function BookingsHeader({ onAdd, onDateRangeChange }: BookingsHeaderProps) {
  const handleTimeFrameClick = (timeFrame: string) => {
    const today = new Date();
    let from: Date;
    let to: Date;

    switch (timeFrame) {
      case 'this-month':
        from = startOfMonth(today);
        to = endOfMonth(today);
        break;
      case 'last-30':
        from = subDays(today, 30);
        to = today;
        break;
      case 'prev-month':
        const lastMonth = subMonths(today, 1);
        from = startOfMonth(lastMonth);
        to = endOfMonth(lastMonth);
        break;
      case 'last-year':
        from = startOfYear(new Date(2024, 0, 1));
        to = endOfYear(new Date(2024, 11, 31));
        break;
      case 'ytd':
        from = startOfYear(today);
        to = today;
        break;
      default:
        return;
    }

    onDateRangeChange({ from, to });
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-semibold text-[#133134]">Bookings</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleTimeFrameClick('this-month')}
            className="bg-white"
          >
            This Mo
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleTimeFrameClick('last-30')}
            className="bg-white"
          >
            Last 30D
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleTimeFrameClick('prev-month')}
            className="bg-white"
          >
            Prev Mo
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleTimeFrameClick('last-year')}
            className="bg-white"
          >
            2024
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleTimeFrameClick('ytd')}
            className="bg-white"
          >
            YTD
          </Button>
        </div>
        <DateRangeFilter onDateRangeChange={onDateRangeChange} />
        <Button onClick={onAdd} className="bg-[#133134] hover:bg-[#0D2426] text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Booking
        </Button>
      </div>
    </div>
  );
}