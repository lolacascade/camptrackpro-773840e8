import { ChatMessage } from "./ChatMessage";

interface Message {
  role: 'assistant' | 'user';
  content: string;
  attachments?: string[];
}

interface ChatMessagesProps {
  messages: Message[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
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
  );
};