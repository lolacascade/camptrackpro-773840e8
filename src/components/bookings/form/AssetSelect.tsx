import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SelectField } from "@/components/common/FormFields/SelectField";
import { Asset } from "@/types/asset";

interface AssetSelectProps {
  value: string;
  onSelect: (value: string) => void;
}

export function AssetSelect({ value, onSelect }: AssetSelectProps) {
  const { data: assets = [] } = useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .eq('status', 'available');

      if (error) throw error;
      return data as Asset[];
    }
  });

  const options = assets.map(asset => ({
    value: asset.id.toString(),
    label: `${asset.asset_name} (${asset.asset_type})`
  }));

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Select RV</label>
      <SelectField
        value={value}
        onChange={onSelect}
        options={options}
        placeholder="Select an RV"
      />
    </div>
  );
}