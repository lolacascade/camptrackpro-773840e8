import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ChatSuggestions } from "./ChatSuggestions";
import { chatService } from "@/services/chat-service";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: 'assistant' | 'user';
  content: string;
  attachments?: string[];
}

interface ChatContainerProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  parkInsights: any;
  conversationId: string;
}

export function ChatContainer({ messages, setMessages, parkInsights, conversationId }: ChatContainerProps) {
  const session = useSession();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);

  const handleSend = async () => {
    if ((!inputValue.trim() && attachments.length === 0) || !session?.access_token) return;

    const userMessage: Message = { 
      role: 'user',
      content: inputValue,
      attachments: attachments.length > 0 ? attachments : undefined
    };
    
    setMessages([...messages, userMessage]);
    setInputValue("");
    setAttachments([]);
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(
        userMessage,
        conversationId,
        session.access_token,
        parkInsights
      );

      if (response.choices && response.choices[0]?.message) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: response.choices[0].message.content
        };
        setMessages([...messages, assistantMessage]);
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      if (error.message === "API quota exceeded") {
        toast.error("API quota exceeded. Please try again later.");
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (url: string) => {
    setAttachments(prev => [...prev, url]);
    toast.success("File uploaded successfully");
  };

  const handlePaste = async (event: ClipboardEvent) => {
    const items = event.clipboardData?.items;
    
    if (!items) return;

    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        const file = item.getAsFile();
        if (!file) continue;

        const fileExt = file.name.split('.').pop() || 'png';
        const filePath = `${Math.random()}.${fileExt}`;

        try {
          const { error: uploadError } = await supabase.storage
            .from('marina-media')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('marina-media')
            .getPublicUrl(filePath);

          handleFileUpload(publicUrl);
        } catch (error: any) {
          toast.error("Failed to upload pasted image");
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, []);

  return (
    <>
      <div className="flex-1 overflow-y-auto space-y-6 p-4 min-h-0">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            role={msg.role}
            content={msg.content}
            attachments={msg.attachments}
          />
        ))}
      </div>

      <div className="p-4 space-y-4 bg-[#0D1D1F]/80 backdrop-blur-sm">
        {messages.length === 0 && (
          <div className="overflow-x-auto no-scrollbar">
            <p className="text-sm text-[#C0CCAB] mb-2">Try asking about:</p>
            <ChatSuggestions
              suggestions={INITIAL_SUGGESTIONS}
              onSelect={setInputValue}
            />
          </div>
        )}
        
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
          isLoading={isLoading}
          onFileUpload={handleFileUpload}
          attachments={attachments}
        />
      </div>
    </>
  );
}

const INITIAL_SUGGESTIONS = [
  "How many RV spots are currently available?",
  "Show me upcoming check-ins for today",
  "List all pending maintenance requests",
  "What's our current occupancy rate?",
  "Show me utility usage statistics"
];