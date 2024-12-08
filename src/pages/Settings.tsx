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
        const { data, error } = await supabase
          .from('marina_details')
          .select('*')
          .maybeSingle();

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
      <div className="bg-white rounded-[24px] p-12 space-y-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="ml-2">Loading marina details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[24px] p-12 space-y-8">
      <h1 className="text-2xl font-bold text-[#133134]">Marina Settings</h1>
      <p className="text-muted-foreground">
        {marinaDetails ? "Update your marina's information below." : "Get started by adding your marina's information."}
      </p>
      <MarinaForm initialData={marinaDetails} />
    </div>
  );
}