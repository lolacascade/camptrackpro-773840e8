import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const navigation = [
  { name: "Dashboard", href: "/app" },
  { name: "Bookings", href: "/app/bookings" },
  { name: "Customers", href: "/app/customers" },
  { name: "Assets", href: "/app/assets" },
  { name: "Maintenance", href: "/app/maintenance" },
  { name: "Financials", href: "/app/financials" },
  { name: "RV Park Map", href: "/app/map" },
];

interface NavigationLinksProps {
  onItemClick?: () => void;
}

export function NavigationLinks({ onItemClick }: NavigationLinksProps) {
  const location = useLocation();
  const isMobile = useIsMobile();

  return (
    <nav className={cn(
      "flex items-center gap-2",
      isMobile ? "flex-col items-start w-full" : "flex-row"
    )}>
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={cn(
            "text-sm font-medium transition-colors relative px-3 py-2 w-full sm:w-auto",
            "after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100",
            location.pathname === item.href
              ? "text-primary after:scale-x-100 after:bg-primary"
              : "text-white hover:text-primary after:bg-primary",
            isMobile && "hover:bg-white/10 rounded-lg"
          )}
          onClick={onItemClick}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}