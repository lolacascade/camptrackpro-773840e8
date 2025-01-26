import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { useOrganization } from "@/hooks/use-organization";

export function ChatAssistant() {
  const session = useSession();
  const { organizationId, accountId } = useOrganization();
  const [availableSites, setAvailableSites] = useState(0);

  const fetchSiteData = async () => {
    if (!session?.user?.id) return;
    
    const { data: sites } = await supabase
      .from("sites")
      .select("*")
      .eq("organization_id", organizationId)
      .eq("account_id", accountId);

    // Process sites data
    const availableSitesCount = sites?.filter(site => site.status === "available")?.length || 0;
    setAvailableSites(availableSitesCount);
  };

  useEffect(() => {
    fetchSiteData();
  }, [session, organizationId, accountId]);

  return (
    <div>
      <h1>Available Sites: {availableSites}</h1>
    </div>
  );
}
