
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavigationLinksProps {
  onItemClick?: () => void;
  className?: string;
}

export function NavigationLinks({ onItemClick, className }: NavigationLinksProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigation = (path: string) => {
    navigate(`/app/${path}`);
    onItemClick?.();
  };

  const isCurrentRoute = (path: string) => {
    return location.pathname === `/app/${path}`;
  };

  const navItems = [
    { path: 'dashboard', label: 'Dashboard' },
    { path: 'bookings', label: 'Bookings' },
    { path: 'customers', label: 'Customers' },
    { path: 'rvs', label: 'RVs' },
    { path: 'sitemap', label: 'Sites' }
  ];

  return (
    <nav className={cn("md:flex items-center gap-6", className)}>
      {navItems.map(({ path, label }) => (
        <button
          key={path}
          onClick={() => handleNavigation(path)}
          className={cn(
            "text-white transition-colors w-full text-left md:w-auto",
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
