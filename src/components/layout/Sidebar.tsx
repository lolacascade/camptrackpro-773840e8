import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BarChart2 } from "lucide-react";

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col bg-primary">
      <div className="flex h-16 items-center justify-center border-b border-primary/10">
        <h1 className="text-2xl font-bold text-white">Marina Manager</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        <Link
          to="/"
          className={cn(
            "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
            location.pathname === "/"
              ? "bg-primary-foreground/10 text-white"
              : "text-primary-foreground/60 hover:bg-primary-foreground/5 hover:text-white"
          )}
        >
          <BarChart2 className="mr-3 h-5 w-5" />
          Overview
        </Link>
      </nav>
    </div>
  );
}