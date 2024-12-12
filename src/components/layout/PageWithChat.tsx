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
        <div className="p-4 md:p-12 pb-20">
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
            className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg z-50"
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
      <ChatAssistant />
      <div className="flex-1 p-12">
        {children}
      </div>
    </div>
  );
}