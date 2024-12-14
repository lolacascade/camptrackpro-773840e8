import { Badge } from "@/components/ui/badge";
import { useRevenueAnnotations } from "./useRevenueAnnotations";

export function RevenueAnnotations() {
  const annotations = useRevenueAnnotations();

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