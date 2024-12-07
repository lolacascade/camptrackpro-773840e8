import { Layout } from "@/components/layout/Layout";
import { MarinaForm } from "@/components/settings/MarinaForm";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function Settings() {
  const [marinaDetails, setMarinaDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMarinaDetails = async () => {
      try {
        // First try to get existing marina details
        const { data, error } = await supabase
          .from('marina_details')
          .select('*')
          .maybeSingle(); // Use maybeSingle() instead of single()

        if (!error) {
          setMarinaDetails(data);
        } else {
          console.error('Error fetching marina details:', error);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarinaDetails();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2">Loading marina details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold">Marina Settings</h1>
        <p className="text-muted-foreground">
          {marinaDetails ? "Update your marina's information below." : "Get started by adding your marina's information."}
        </p>
        
        <div className="bg-card rounded-lg p-6">
          <MarinaForm initialData={marinaDetails} />
        </div>
      </div>
    </Layout>
  );
}