import { useNavigate } from "react-router-dom";

export function Logo() {
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => navigate('/')}
      className="cursor-pointer text-white hover:text-primary transition-colors"
    >
      <span className="text-xl font-semibold">DockEase</span>
    </div>
  );
}