import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SelectField } from "@/components/common/FormFields/SelectField";
import { Asset } from "@/types/asset";
import { useOrganization } from "@/hooks/use-organization";

interface AssetSelectProps {
  value: string;
  onSelect: (value: string) => void;
}

export function AssetSelect({ value, onSelect }: AssetSelectProps) {
  const { organizationId, accountId } = useOrganization();

  const { data: assets = [] } = useQuery({
    queryKey: ['assets', organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) return [];

      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .eq('status', 'available')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (error) throw error;
      return data as Asset[];
    },
    enabled: !!organizationId && !!accountId
  });

  const options = assets.map(asset => ({
    value: asset.id.toString(),
    label: `${asset.asset_name || asset.name} (${asset.asset_type || asset.type})`
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