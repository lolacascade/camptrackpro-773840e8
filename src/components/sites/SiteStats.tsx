
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StatsGrid } from "@/components/common/stats/StatsGrid";
import { useOrganization } from "@/hooks/use-organization";

interface SiteStatsProps {
  totalSites: number;
  availableSites: number;
  occupiedSites: number;
  occupancyRate: number;
}

export function SiteStats({ 
  totalSites,
  availableSites,
  occupiedSites,
  occupancyRate 
}: SiteStatsProps) {
  const stats = [
    {
      name: 'Total Sites',
      value: totalSites,
      change: null,
      trend: 'neutral'
    },
    {
      name: 'Available Sites',
      value: availableSites,
      change: null,
      trend: 'increase'
    },
    {
      name: 'Occupied Sites',
      value: occupiedSites,
      change: null,
      trend: 'neutral'
    },
    {
      name: 'Occupancy Rate',
      value: `${occupancyRate}%`,
      change: null,
      trend: 'neutral'
    }
  ];

  return <StatsGrid stats={stats} />;
}
