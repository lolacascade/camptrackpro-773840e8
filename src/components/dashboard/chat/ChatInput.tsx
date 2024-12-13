import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export const ChatInput = ({ value, onChange, onSend, isLoading }: ChatInputProps) => {
  return (
    <div className="flex gap-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your question..."
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        className="bg-[#0D1D1F] text-white placeholder:text-white/50 border-[#C0CCAB]/50"
        disabled={isLoading}
      />
      <Button 
        onClick={onSend} 
        size="icon" 
        className="bg-[#C0CCAB] hover:bg-[#C0CCAB]/90"
        disabled={isLoading}
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};