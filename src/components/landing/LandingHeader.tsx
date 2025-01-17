import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function LandingHeader() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-secondary/95 backdrop-blur-sm border-b border-[rgba(255,255,255,0.1)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
              <span className="text-foreground-light">Camp</span>
              <span className="text-foreground-light">Track</span>
              <span className="text-primary">Pro</span>
            </a>
          </div>
          
          <div className="flex items-center gap-6">
            <Link 
              to="/login"
              className="text-foreground-light hover:text-primary transition-colors"
            >
              Sign in
            </Link>
            <Button 
              onClick={() => navigate('/login')}
              className="bg-primary text-secondary hover:bg-primary-light px-6"
            >
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}