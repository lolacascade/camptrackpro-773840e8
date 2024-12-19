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
    <div className="grid grid-cols-12 min-h-[calc(100vh-4rem)] gap-0">
      <div className="col-span-3 sticky top-16 h-[calc(100vh-4rem)] overflow-hidden">
        <ChatAssistant />
      </div>
      <div className="col-span-9 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}