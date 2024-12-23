import { ChatSuggestions } from "./ChatSuggestions";

const INITIAL_SUGGESTIONS = [
  "How many RV spots are currently available?",
  "Show me upcoming check-ins for today",
  "List all pending maintenance requests",
  "What's our current occupancy rate?",
  "Show me utility usage statistics"
];

interface ChatSuggestionsAreaProps {
  onSelect: (suggestion: string) => void;
}

export const ChatSuggestionsArea = ({ onSelect }: ChatSuggestionsAreaProps) => {
  return (
    <div className="overflow-x-auto no-scrollbar">
      <p className="text-sm text-[#C0CCAB] mb-2">Try asking about:</p>
      <ChatSuggestions
        suggestions={INITIAL_SUGGESTIONS}
        onSelect={onSelect}
      />
    </div>
  );
};