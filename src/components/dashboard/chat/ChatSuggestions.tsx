import { cn } from "@/lib/utils";

interface ChatSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export const ChatSuggestions = ({ suggestions, onSelect }: ChatSuggestionsProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect(suggestion)}
          className={cn(
            "px-4 py-2 rounded-full text-sm whitespace-nowrap",
            "bg-[#C0CCAB]/20 text-[#C0CCAB] hover:bg-[#C0CCAB]/30 transition-colors"
          )}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};