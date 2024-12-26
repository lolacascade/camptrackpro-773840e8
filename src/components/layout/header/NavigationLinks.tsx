import { useNavigate } from "react-router-dom";

export function NavigationLinks({ onItemClick }: { onItemClick?: () => void }) {
  const navigate = useNavigate();
  
  const handleNavigation = (path: string) => {
    navigate(path);
    onItemClick?.();
  };

  return (
    <nav className="hidden md:flex items-center gap-6">
      <button
        onClick={() => handleNavigation('/app/dashboard')}
        className="text-white hover:text-primary transition-colors"
      >
        Dashboard
      </button>
      <button
        onClick={() => handleNavigation('/app/customers')}
        className="text-white hover:text-primary transition-colors"
      >
        Customers
      </button>
      <button
        onClick={() => handleNavigation('/app/bookings')}
        className="text-white hover:text-primary transition-colors"
      >
        Bookings
      </button>
      <button
        onClick={() => handleNavigation('/app/map')}
        className="text-white hover:text-primary transition-colors"
      >
        Map
      </button>
      <button
        onClick={() => handleNavigation('/app/maintenance')}
        className="text-white hover:text-primary transition-colors"
      >
        Maintenance
      </button>
      <button
        onClick={() => handleNavigation('/app/financials')}
        className="text-white hover:text-primary transition-colors"
      >
        Financials
      </button>
    </nav>
  );
}