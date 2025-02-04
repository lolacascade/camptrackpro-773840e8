import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface EmailSignupFormProps {
  className?: string;
}

export function EmailSignupForm({ className }: EmailSignupFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      navigate(`/login?mode=signup&email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className={`bg-foreground-light rounded-lg p-1 flex gap-2 ${className}`}>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 border-0 focus-visible:ring-0 text-body-large lg:text-lg:body-large placeholder:text-gray-400"
      />
      <Button 
        type="submit"
        disabled={isLoading}
        className="bg-primary hover:bg-primary-light text-secondary font-medium whitespace-nowrap px-6 text-body-large lg:text-lg:body-large"
      >
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>
    </form>
  );
}