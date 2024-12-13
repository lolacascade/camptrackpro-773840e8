import { Layout } from "@/components/layout/Layout";
import { MarinaForm } from "@/components/settings/MarinaForm";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { useSession } from '@supabase/auth-helpers-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Settings() {
  const [marinaDetails, setMarinaDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!session?.user?.id) {
      navigate('/login');
      return;
    }

    const fetchMarinaDetails = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const { data, error } = await supabase
          .from('marina_details')
          .select('*')
          .eq('user_id', session.user.id);

        if (error) {
          console.error('Error fetching marina details:', error);
          setError("Failed to load marina details. Please try again.");
          return;
        }

        setMarinaDetails(data && data.length > 0 ? data[0] : null);
      } catch (error) {
        console.error('Error:', error);
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarinaDetails();
  }, [session, navigate]);

  if (!session?.user?.id) {
    return null;
  }

  return (
    <PageWithChat>
      <div className="bg-white rounded-[24px] p-12 space-y-8">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-[#133134]">Marina Settings</h1>
          <p className="text-muted-foreground">
            {marinaDetails 
              ? "Update your marina's information below." 
              : "Get started by adding your marina's information."}
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-12 w-1/2" />
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <MarinaForm 
            initialData={marinaDetails} 
            onSuccess={() => {
              toast({
                title: "Success",
                description: "Marina details have been saved successfully.",
              });
            }}
          />
        )}
      </div>
    </PageWithChat>
  );
}