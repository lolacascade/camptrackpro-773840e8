
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export function LogoutButton() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      // Always navigate to signin page, even if signOut fails
      navigate('/signin', { replace: true });
    } catch (error: any) {
      console.error('Error during logout:', error);
      // Show toast but still redirect to signin
      toast({
        title: "Error during logout",
        description: "You have been redirected to the sign in page.",
        variant: "destructive",
      });
      navigate('/signin', { replace: true });
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
