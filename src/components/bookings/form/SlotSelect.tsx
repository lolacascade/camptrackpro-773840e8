
import { SelectField } from "@/components/common/FormFields/SelectField";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DateRange } from "react-day-picker";
import { useOrganization } from "@/hooks/use-organization";
import { EntityDrawer } from "@/components/common/EntityDrawer";
import { Field } from "@/components/common/EntityDrawer/types";
import { Site } from "@/types/site";

interface SlotSelectProps {
  value: string;
  onSelect: (slotId: string) => void;
  dateRange?: DateRange;
  onSiteCreated: (siteId: string) => void;
}

export function SlotSelect({ value, onSelect, dateRange, onSiteCreated }: SlotSelectProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { organizationId, accountId } = useOrganization();
  const queryClient = useQueryClient();

  const { data: sites } = useQuery<Site[]>({
    queryKey: ['sites', organizationId, accountId, dateRange],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sites')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (error) throw error;
      return data || [];
    },
    enabled: !!organizationId && !!accountId
  });

  const options = (sites || []).map(site => ({
    value: String(site.id),
    label: site.name
  }));

  const siteFields: Field[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'location', label: 'Location', type: 'text', required: true }
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Select Site</label>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2"
          onClick={() => setIsDrawerOpen(true)}
        >
          <Plus className="h-4 w-4 mr-1" />
          New Site
        </Button>
      </div>
      <SelectField
        value={value}
        onChange={onSelect}
        options={options}
        placeholder="Select site"
      />
      <EntityDrawer
        entity={null}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onEntityUpdated={(entity) => {
          if (entity?.id) {
            onSiteCreated(String(entity.id));
            queryClient.invalidateQueries({ queryKey: ['sites', organizationId, accountId] });
          }
          setIsDrawerOpen(false);
        }}
        title="Site"
        fields={siteFields}
        tableName="sites"
      />
    </div>
  );
}
