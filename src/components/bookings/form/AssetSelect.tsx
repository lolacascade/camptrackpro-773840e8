
import { SelectField } from "@/components/common/FormFields/SelectField";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import { EntityDrawer } from "@/components/common/EntityDrawer";
import { Field } from "@/components/common/EntityDrawer/types";

interface AssetSelectProps {
  value: string;
  onSelect: (assetId: string) => void;
  onAssetCreated: (assetId: string) => void;
}

export function AssetSelect({ value, onSelect, onAssetCreated }: AssetSelectProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { organizationId, accountId } = useOrganization();

  const { data: assets } = useQuery({
    queryKey: ['assets', organizationId, accountId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (error) throw error;
      return data || [];
    },
    enabled: !!organizationId && !!accountId
  });

  const options = (assets || []).map(asset => ({
    value: asset.id,
    label: `${asset.name} (${asset.asset_size})`
  }));

  const assetFields: Field[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'asset_name', label: 'Asset Name', type: 'text', required: true },
    { name: 'asset_size', label: 'Size', type: 'text', required: true },
    { name: 'asset_type', label: 'Type', type: 'text', required: true },
    { name: 'daily_rate', label: 'Daily Rate', type: 'number', required: true }
  ];

  const handleEntityUpdated = (newAsset: any) => {
    setIsDrawerOpen(false);
    if (newAsset?.id) {
      onAssetCreated(newAsset.id);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Select RV</label>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2"
          onClick={() => setIsDrawerOpen(true)}
        >
          <Plus className="h-4 w-4 mr-1" />
          New RV
        </Button>
      </div>
      <SelectField
        value={value}
        onChange={onSelect}
        options={options}
        placeholder="Select RV"
      />
      <EntityDrawer
        entity={null}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onEntityUpdated={handleEntityUpdated}
        title="RV"
        fields={assetFields}
        tableName="assets"
      />
    </div>
  );
}
