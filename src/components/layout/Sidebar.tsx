import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Anchor, BarChart2, Calendar, Settings, Users } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart2 },
  { name: "Marina Map", href: "/map", icon: Anchor },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Maintenance", href: "/maintenance", icon: Calendar },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col bg-primary">
      <div className="flex h-16 items-center justify-center border-b border-primary/10">
        <h1 className="text-2xl font-bold text-white">Marina Manager</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
                location.pathname === item.href
                  ? "bg-primary-foreground/10 text-white"
                  : "text-primary-foreground/60 hover:bg-primary-foreground/5 hover:text-white"
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}