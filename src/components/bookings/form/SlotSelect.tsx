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
  const { data: slots = [] } = useQuery({
    queryKey: ['available-slots', dateRange],
    queryFn: async () => {
      if (!dateRange?.from || !dateRange?.to) return [];

      const { data, error } = await supabase
        .from('slots')
        .select('*')
        .eq('status', 'available');

      if (error) throw error;
      return data;
    },
    enabled: !!dateRange?.from && !!dateRange?.to
  });

  const options = slots.map(slot => ({
    value: slot.id.toString(),
    label: `${slot.name} (${slot.length_ft}' x ${slot.width_ft}')`
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