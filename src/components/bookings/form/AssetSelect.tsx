
import { SelectField } from "@/components/common/FormFields/SelectField";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  const { data: rvs } = useQuery({
    queryKey: ['rvs', organizationId, accountId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rvs')
        .select('*');

      if (error) throw error;
      return data || [];
    },
    enabled: !!organizationId && !!accountId
  });

  const options = (rvs || []).map(rv => ({
    value: String(rv.id),
    label: `${rv.make} ${rv.model} ${rv.year || ''}`
  }));

  const assetFields: Field[] = [
    { name: 'make', label: 'Make', type: 'text', required: true },
    { name: 'model', label: 'Model', type: 'text', required: true },
    { name: 'year', label: 'Year', type: 'number', required: false }
  ];

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
        onEntityUpdated={(entity) => {
          if (entity?.id) {
            onAssetCreated(String(entity.id));
            queryClient.invalidateQueries({ queryKey: ['rvs', organizationId, accountId] });
          }
          setIsDrawerOpen(false);
        }}
        title="RV"
        fields={assetFields}
        tableName="rvs"
      />
    </div>
  );
}
