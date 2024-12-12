import { format, subMonths } from "date-fns";
import { Annotation } from "./types";

export function useRevenueAnnotations(): Annotation[] {
  const currentDate = new Date();
  
  return [
    { 
      month: format(currentDate, 'MMM yyyy'),
      text: "Peak seasonal demand",
      type: "positive"
    },
    {
      month: format(subMonths(currentDate, 1), 'MMM yyyy'),
      text: "Maintenance revenue increased",
      type: "positive"
    },
    {
      month: format(subMonths(currentDate, 2), 'MMM yyyy'),
      text: "Weather impact on rentals",
      type: "negative"
    },
  ];
}