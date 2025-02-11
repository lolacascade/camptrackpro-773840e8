
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DateRangeFilter } from "@/components/common/DateRangeFilter";
import { startOfMonth, endOfMonth, subMonths, startOfYear, endOfYear } from "date-fns";

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
      case '1M':
        from = startOfMonth(subMonths(today, 1));
        to = endOfMonth(subMonths(today, 1));
        break;
      case '3M':
        from = startOfMonth(subMonths(today, 3));
        to = today;
        break;
      case '6M':
        from = startOfMonth(subMonths(today, 6));
        to = today;
        break;
      case '1Y':
        from = startOfYear(today);
        to = today;
        break;
      case 'ALL':
        from = new Date(2020, 0, 1); // Starting from 2020
        to = today;
        break;
      default:
        return;
    }

    onDateRangeChange({ from, to });
  };

  return (
    <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-semibold text-[#133134]">Bookings</h1>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleTimeFrameClick('1M')}
            className="bg-white flex-1 sm:flex-none"
          >
            1M
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleTimeFrameClick('3M')}
            className="bg-white flex-1 sm:flex-none"
          >
            3M
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleTimeFrameClick('6M')}
            className="bg-white flex-1 sm:flex-none"
          >
            6M
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleTimeFrameClick('1Y')}
            className="bg-white flex-1 sm:flex-none"
          >
            1Y
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleTimeFrameClick('ALL')}
            className="bg-white flex-1 sm:flex-none"
          >
            ALL
          </Button>
        </div>
        <DateRangeFilter onDateRangeChange={onDateRangeChange} />
        <Button 
          onClick={onAdd} 
          className="bg-[#133134] hover:bg-[#0D2426] text-white w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Booking
        </Button>
      </div>
    </div>
  );
}
