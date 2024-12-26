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
        "h-full px-2 sm:px-4 md:px-6 lg:px-10 py-4 sm:py-6",
        className
      )}>
        <div className="h-full rounded-lg sm:rounded-[24px] bg-white p-3 sm:p-4 md:p-6 lg:p-8 relative">
          {isSettingsPage && <LogoutButton />}
          {children}
        </div>
      </div>
    </div>
  );
}