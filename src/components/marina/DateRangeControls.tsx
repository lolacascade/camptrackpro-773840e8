import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { DateRangeControlsProps } from "./types";

export function DateRangeControls({ 
  currentDate, 
  dateRange, 
  onDateRangeChange,
  onNavigate 
}: DateRangeControlsProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDateRangeChange(6)}
          className={dateRange === 6 ? 'bg-primary text-primary-foreground' : ''}
        >
          6M
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDateRangeChange(12)}
          className={dateRange === 12 ? 'bg-primary text-primary-foreground' : ''}
        >
          12M
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onNavigate('prev')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-[#133134] text-base font-medium">
          {format(currentDate, 'MMM yyyy')}
        </span>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onNavigate('next')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}