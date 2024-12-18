import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function LandingHeader() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#0D1D1F]/95 backdrop-blur-sm z-50 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
              <span className="text-white">Camp</span>
              <span className="text-white">Track</span>
              <span className="text-[#C0CCAB]">Pro</span>
            </a>
          </div>
          
          <div className="flex items-center gap-6">
            <Link 
              to="/login"
              className="text-white hover:text-[#C0CCAB] transition-colors"
            >
              Sign in
            </Link>
            <Button 
              onClick={() => navigate('/login')}
              className="bg-[#C0CCAB] text-[#0D1D1F] hover:bg-[#C0CCAB]/90 px-6"
            >
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}