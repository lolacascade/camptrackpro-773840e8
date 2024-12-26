import { Bell, Menu, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NotificationDrawer } from "@/components/notifications/NotificationDrawer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { NavigationLinks } from "./header/NavigationLinks";
import { SearchDialog } from "./header/SearchDialog";
import { Logo } from "./header/Logo";

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
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
    <div className="fixed top-0 left-0 right-0 z-[100] flex h-16 items-center justify-between px-3 sm:px-4 bg-[#0D1D1F] shadow-md">
      <div className="flex items-center gap-4">
        {isMobile && (
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-[#0D1D1F] p-6">
              <div className="flex flex-col gap-8">
                <Logo />
                <NavigationLinks onItemClick={() => setMobileMenuOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        )}
        
        <Logo />
      </div>
      
      {!isMobile && <NavigationLinks />}
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSearchOpen(true)}
          className="text-white hover:text-primary hover:bg-transparent"
        >
          <Search className="h-5 w-5" />
        </Button>

        <Button 
          variant="ghost" 
          size="icon"
          className="relative text-white hover:text-primary hover:bg-transparent"
          onClick={() => setNotificationOpen(true)}
        >
          <Bell className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:text-primary hover:bg-transparent"
          onClick={() => navigate('/app/settings')}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      <NotificationDrawer
        open={notificationOpen}
        onOpenChange={setNotificationOpen}
        notifications={[]}
        onMarkAsRead={() => {}}
      />
    </div>
  );
}