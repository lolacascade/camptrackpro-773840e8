import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SelectField } from "@/components/common/FormFields/SelectField";
import { DateRange } from "react-day-picker";

interface SlotSelectProps {
  value: string;
  onSelect: (value: string) => void;
  dateRange?: DateRange;
}

export function SlotSelect({ value, onSelect, dateRange }: SlotSelectProps) {
  const { data: sites = [] } = useQuery({
    queryKey: ['available-sites', dateRange],
    queryFn: async () => {
      if (!dateRange?.from || !dateRange?.to) return [];

      const { data, error } = await supabase
        .from('sites')
        .select('*')
        .eq('status', 'available');

      if (error) throw error;
      return data;
    },
    enabled: !!dateRange?.from && !!dateRange?.to
  });

  const options = sites.map(site => ({
    value: site.id.toString(),
    label: `${site.name} (${site.length_ft}' x ${site.width_ft}')`
  }));

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Select Site</label>
      <SelectField
        value={value}
        onChange={onSelect}
        options={options}
        placeholder="Select a site"
      />
    </div>
  );
}