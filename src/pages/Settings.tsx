import { Layout } from "@/components/layout/Layout";
import { MarinaForm } from "@/components/settings/MarinaForm";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { useSession } from '@supabase/auth-helpers-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

export default function Settings() {
  const [marinaDetails, setMarinaDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!session) {
      navigate('/login');
      return;
    }

    const fetchMarinaDetails = async () => {
      try {
        const { data, error } = await supabase
          .from('marina_details')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching marina details:', error);
          toast({
            title: "Error",
            description: "Failed to load marina details. Please try again.",
            variant: "destructive",
          });
        }

        // If data exists, set it. If not, leave as null for new marina creation
        setMarinaDetails(data || null);
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarinaDetails();
  }, [session, navigate, toast]);

  if (!session) {
    return null; // Will redirect in useEffect
  }

  if (isLoading) {
    return (
      <PageWithChat>
        <div className="bg-white rounded-[24px] p-12 space-y-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="ml-2">Loading marina details...</p>
          </div>
        </div>
      </PageWithChat>
    );
  }

  return (
    <PageWithChat>
      <div className="bg-white rounded-[24px] p-12 space-y-8">
        <h1 className="text-2xl font-bold text-[#133134]">Marina Settings</h1>
        <p className="text-muted-foreground">
          {marinaDetails ? "Update your marina's information below." : "Get started by adding your marina's information."}
        </p>
        <MarinaForm initialData={marinaDetails} />
      </div>
    </PageWithChat>
  );
}