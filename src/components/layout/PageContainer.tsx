import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const isSettingsPage = location.pathname === '/app/settings';

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      navigate('/login', { replace: true });
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: "Error logging out",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0D1D1F]">
      <div className={cn(
        "h-full px-2 sm:px-4 md:px-6 lg:px-10 py-4 sm:py-6",
        className
      )}>
        <div className="h-full rounded-lg sm:rounded-[24px] bg-white p-3 sm:p-4 md:p-6 lg:p-8 relative">
          {isSettingsPage && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span className="hidden sm:inline">Log Out</span>
            </Button>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}