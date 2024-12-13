import { Button } from "@/components/ui/button";

interface ChatSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export const ChatSuggestions = ({ suggestions, onSelect }: ChatSuggestionsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((suggestion, i) => (
        <Button
          key={i}
          variant="outline"
          size="sm"
          onClick={() => onSelect(suggestion)}
          className="bg-[#C0CCAB] text-[#0D1D1F] hover:bg-[#C0CCAB]/80 border-none"
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
};