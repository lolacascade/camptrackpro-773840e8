
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { SelectField } from "@/components/common/FormFields/SelectField";
import { supabase } from "@/integrations/supabase/client";
import { Site } from "@/types/site";
import { DateRange } from "react-day-picker";

interface SiteSelectProps {
  value: string;
  onSelect: (value: string) => void;
  dateRange?: DateRange;
  onSiteCreated: (siteId: string) => void;
}

export function SiteSelect({ value, onSelect, dateRange, onSiteCreated }: SiteSelectProps) {
  const [sites, setSites] = useState<Site[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const { data, error } = await supabase
          .from('sites')
          .select('*');

        if (error) throw error;
        setSites(data || []);
      } catch (error) {
        console.error('Error fetching sites:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSites();
  }, []);

  const siteOptions = sites.map(site => ({
    value: site.id,
    label: site.name
  }));

  if (isLoading) {
    return <div>Loading sites...</div>;
  }

  return (
    <div className="space-y-2">
      <Label>Site</Label>
      <SelectField
        value={value}
        onChange={onSelect}
        options={siteOptions}
        placeholder="Select a site"
      />
    </div>
  );
}
