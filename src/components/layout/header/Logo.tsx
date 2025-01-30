import { useNavigate, useLocation } from "react-router-dom";

export function Logo() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogoClick = () => {
    if (location.pathname.startsWith('/app')) {
      navigate('/app/dashboard');
    } else {
      navigate('/');
    }
  };
  
  return (
    <div 
      onClick={handleLogoClick}
      className="cursor-pointer hover:opacity-90 transition-colors"
    >
      <span className="text-xl font-semibold">
        <span className="text-white">CampTrack</span>
        <span className="text-[#F2FCE2]">Pro</span>
      </span>
    </div>
  );
}