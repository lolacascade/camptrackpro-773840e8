import { useState } from "react";
import { ChatAssistant } from "@/components/dashboard/ChatAssistant";
import { Button } from "@/components/ui/button";
import { MessageSquare, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface PageWithChatProps {
  children: React.ReactNode;
}

export function PageWithChat({ children }: PageWithChatProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="relative min-h-[calc(100vh-4rem)]">
        <div className="p-2">
          {children}
        </div>
        
        {isChatOpen ? (
          <div className="fixed inset-0 bg-background z-50 overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50"
              onClick={() => setIsChatOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
            <ChatAssistant />
          </div>
        ) : (
          <Button
            className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg z-50 bg-primary hover:bg-primary-dark"
            onClick={() => setIsChatOpen(true)}
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <div className="w-[300px] fixed top-16 bottom-0 left-0 overflow-hidden">
        <ChatAssistant />
      </div>
      <div className="ml-[300px] flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}