import { useState, useEffect } from "react";
import { NotificationDrawer } from "@/components/notifications/NotificationDrawer";
import { SearchDialog } from "./header/SearchDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { NavigationLinks } from "./header/NavigationLinks";
import { Logo } from "./header/Logo";
import { MobileMenu } from "./header/MobileMenu";
import { HeaderActions } from "./header/HeaderActions";

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <header className="sticky top-0 left-0 right-0 z-[100] flex h-16 items-center justify-between px-3 sm:px-4 bg-[#0D1D1F]">
      <div className="flex items-center gap-4">
        {isMobile && (
          <MobileMenu 
            isOpen={mobileMenuOpen} 
            onOpenChange={setMobileMenuOpen} 
          />
        )}
        <Logo />
      </div>
      
      {!isMobile && <NavigationLinks />}
      
      <HeaderActions 
        onSearchOpen={() => setSearchOpen(true)}
        onNotificationOpen={() => setNotificationOpen(true)}
      />

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      <NotificationDrawer
        open={notificationOpen}
        onOpenChange={setNotificationOpen}
        notifications={[]}
        onMarkAsRead={() => {}}
      />
    </header>
  );
}