import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "assistant" | "user";
  content: string;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "p-3 rounded-lg inline-block",
        role === "assistant" 
          ? "text-[#C0CCAB] max-w-[80%]" 
          : "bg-[#C0CCAB] text-[#0D1D1F] ml-auto max-w-[80%]"
      )}
    >
      {content}
    </div>
  );
};