import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddSiteDrawer } from "../site/AddSiteDrawer";

interface MarinaHeaderProps {
  title?: string;
}

export function MarinaHeader({ title = "Camp Map" }: MarinaHeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-[#133134]">{title}</h1>
        <Button 
          className="bg-[#C0CCAB] text-[#0D1D1F] hover:bg-[#C0CCAB]/90"
          onClick={() => setIsDrawerOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Site
        </Button>
      </div>

      <AddSiteDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSiteAdded={() => {
          // Trigger a refresh of the sites list
          window.location.reload();
        }}
      />
    </>
  );
}