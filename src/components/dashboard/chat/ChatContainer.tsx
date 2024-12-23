import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { chatService } from "@/services/chat-service";
import { toast } from "sonner";
import { ChatMessages } from "./ChatMessages";
import { ChatInputArea } from "./ChatInputArea";
import { ChatSuggestionsArea } from "./ChatSuggestionsArea";

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

export function ChatContainer({ 
  messages, 
  setMessages, 
  parkInsights, 
  conversationId 
}: ChatContainerProps) {
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
    
    setMessages(prev => [...prev, userMessage]);
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
        setMessages(prev => [...prev, assistantMessage]);
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

  return (
    <>
      <ChatMessages messages={messages} />
      <div className="p-4 space-y-4 bg-[#0D1D1F]/80 backdrop-blur-sm">
        {messages.length === 0 && (
          <ChatSuggestionsArea onSelect={setInputValue} />
        )}
        <ChatInputArea
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
          isLoading={isLoading}
          attachments={attachments}
          onFileUpload={handleFileUpload}
        />
      </div>
    </>
  );
}