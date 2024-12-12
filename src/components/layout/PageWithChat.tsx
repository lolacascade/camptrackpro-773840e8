import { ChatAssistant } from "@/components/dashboard/ChatAssistant";

interface PageWithChatProps {
  children: React.ReactNode;
}

export function PageWithChat({ children }: PageWithChatProps) {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <ChatAssistant />
      <div className="flex-1 p-12">
        {children}
      </div>
    </div>
  );
}