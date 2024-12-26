import { Button } from "@/components/ui/button";

interface ChatSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export const ChatSuggestions = ({ suggestions, onSelect }: ChatSuggestionsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="secondary"
          className="text-sm bg-[#1A2C2E] text-[#C0CCAB] hover:bg-[#243638] rounded-full whitespace-normal text-left h-auto py-2"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
};