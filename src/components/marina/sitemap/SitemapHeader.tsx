import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface SitemapHeaderProps {
  onAddSpot: () => void;
}

export function SitemapHeader({ onAddSpot }: SitemapHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-semibold text-[#133134]">Sitemap</h1>
      <Button 
        onClick={onAddSpot}
        className="bg-[#C0CCAB] text-[#0D1D1F] hover:bg-[#C0CCAB]/90"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Spot
      </Button>
    </div>
  );
}