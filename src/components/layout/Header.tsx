
import { useIsMobile } from "@/hooks/use-mobile";
import { NavigationLinks } from "./header/NavigationLinks";
import { Logo } from "./header/Logo";
import { MobileMenu } from "./header/MobileMenu";
import { HeaderActions } from "./header/HeaderActions";

export function Header() {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 left-0 right-0 z-[100] flex h-16 items-center justify-between px-3 sm:px-4 bg-[#0D1D1F]">
      <div className="flex items-center gap-4">
        {isMobile && (
          <MobileMenu 
            isOpen={false} 
            onOpenChange={() => {}} 
          />
        )}
        <Logo />
      </div>
      
      {!isMobile && <NavigationLinks />}
      
      <HeaderActions />
    </header>
  );
}
