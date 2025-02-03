import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function LogoutButton() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      // First check if we have a session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // If no session, just redirect to login
        navigate('/login', { replace: true });
        return;
      }

      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      navigate('/login', { replace: true });
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error: any) {
      console.error('Error logging out:', error);
      // Even if logout fails, redirect to login page
      navigate('/login', { replace: true });
      
      toast({
        title: "Error during logout",
        description: "You have been redirected to the login page.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      className="absolute top-2 sm:top-4 right-2 sm:right-4 text-red-600 hover:text-red-700 hover:bg-red-50"
    >
      <LogOut className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
      <span className="hidden sm:inline">Log Out</span>
    </Button>
  );
}