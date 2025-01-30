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
        "h-full p-2 sm:px-2 md:px-3 md:py-2",
        className
      )}>
        <div className="h-full rounded-lg sm:rounded-[24px] bg-white p-3 sm:p-4 md:p-6 relative overflow-x-auto">
          {isSettingsPage && <LogoutButton />}
          {children}
        </div>
      </div>
    </div>
  );
}