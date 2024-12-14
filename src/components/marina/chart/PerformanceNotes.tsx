import { Badge } from "@/components/ui/badge";

interface PerformanceNote {
  month: string;
  message: string;
  type: 'positive' | 'negative' | 'neutral';
}

interface PerformanceNotesProps {
  notes: PerformanceNote[];
}

export function PerformanceNotes({ notes }: PerformanceNotesProps) {
  return (
    <div className="space-y-2 mt-4">
      <h4 className="text-sm font-medium">Monthly Insights</h4>
      <div className="flex flex-wrap gap-2">
        {notes.map((note, index) => (
          <Badge 
            key={index}
            variant={note.type === 'positive' ? 'default' : 'destructive'}
            className="text-xs"
          >
            {note.month}: {note.message}
          </Badge>
        ))}
      </div>
    </div>
  );
}