
import { supabase } from "@/integrations/supabase/client";
import { Site, SiteFormData } from "@/types/site";

export async function createSite(formData: SiteFormData, organizationId: string, accountId: string) {
  const { data, error } = await supabase
    .from('sites')
    .insert([{
      ...formData,
      organization_id: organizationId,
      account_id: accountId
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateSite(id: string, formData: SiteFormData) {
  const { data, error } = await supabase
    .from('sites')
    .update(formData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getSitesByOrganization(organizationId: string, accountId: string) {
  const { data, error } = await supabase
    .from('sites')
    .select('*')
    .eq('organization_id', organizationId)
    .eq('account_id', accountId);

  if (error) throw error;
  return data as Site[];
}
