import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  const location = useLocation();
  const isSettingsPage = location.pathname === '/app/settings';

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0D1D1F]">
      <div className={cn(
        "h-full px-1 sm:px-2 md:px-3 py-2",
        className
      )}>
        <div className="h-full rounded-lg sm:rounded-[24px] bg-white p-6 relative">
          {isSettingsPage && <LogoutButton />}
          {children}
        </div>
      </div>
    </div>
  );
}