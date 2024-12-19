import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "assistant" | "user";
  content: string;
  attachments?: string[];
}

export const ChatMessage = ({ role, content, attachments }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "space-y-2",
        role === "user" && "flex flex-col items-end"
      )}
    >
      <div className={cn(
        "p-3 rounded-lg max-w-[80%]",
        role === "assistant" 
          ? "bg-[#1A2C2E] text-[#C0CCAB]" 
          : "bg-[#C0CCAB] text-[#0D1D1F]"
      )}>
        {content}
      </div>
      {attachments && attachments.length > 0 && (
        <div className="flex gap-2 flex-wrap max-w-[80%]">
          {attachments.map((url, index) => (
            <img 
              key={index} 
              src={url} 
              alt="Attachment" 
              className="h-32 w-32 object-cover rounded"
            />
          ))}
        </div>
      )}
    </div>
  );
};