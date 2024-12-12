import { Badge } from "@/components/ui/badge";
import { format, subMonths } from "date-fns";
import { Annotation } from "./types";

export function RevenueAnnotations() {
  const currentDate = new Date();
  
  const annotations: Annotation[] = [
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

  return (
    <div className="flex flex-wrap gap-2">
      {annotations.map((annotation, index) => (
        <Badge 
          key={index}
          variant={annotation.type === "positive" ? "default" : 
                  annotation.type === "negative" ? "destructive" : 
                  "secondary"}
        >
          {annotation.month}: {annotation.text}
        </Badge>
      ))}
    </div>
  );
}