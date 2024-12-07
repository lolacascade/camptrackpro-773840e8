import { Layout } from "@/components/layout/Layout";
import { MarinaForm } from "@/components/settings/MarinaForm";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function Settings() {
  const [marinaDetails, setMarinaDetails] = useState(null);

  useEffect(() => {
    const fetchMarinaDetails = async () => {
      const { data, error } = await supabase
        .from('marina_details')
        .select('*')
        .single();

      if (!error && data) {
        setMarinaDetails(data);
      }
    };

    fetchMarinaDetails();
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold">Marina Settings</h1>
        <p className="text-muted-foreground">
          Manage your marina's information and settings here.
        </p>
        
        <div className="bg-card rounded-lg p-6">
          <MarinaForm initialData={marinaDetails} />
        </div>
      </div>
    </Layout>
  );
}