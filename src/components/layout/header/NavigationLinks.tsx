import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function NavigationLinks({ onItemClick }: { onItemClick?: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigation = (path: string) => {
    navigate(`/app/${path.toLowerCase()}`);
    onItemClick?.();
  };

  const isCurrentRoute = (path: string) => {
    return location.pathname === `/app/${path.toLowerCase()}`;
  };

  const navItems = [
    { path: 'dashboard', label: 'Dashboard' },
    { path: 'customers', label: 'Customers' },
    { path: 'assets', label: 'RVs' },
    { path: 'bookings', label: 'Bookings' },
    { path: 'map', label: 'Map' },
    { path: 'maintenance', label: 'Maintenance' },
    { path: 'financials', label: 'Financials' },
  ];

  return (
    <nav className="hidden md:flex items-center gap-6">
      {navItems.map(({ path, label }) => (
        <button
          key={path}
          onClick={() => handleNavigation(path)}
          className={cn(
            "text-white transition-colors",
            isCurrentRoute(path) 
              ? "text-primary font-medium" 
              : "hover:text-primary"
          )}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}