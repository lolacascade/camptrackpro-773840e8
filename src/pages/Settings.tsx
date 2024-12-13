import { PageContainer } from "@/components/layout/PageContainer";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { MarinaForm } from "@/components/settings/MarinaForm";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from '@supabase/auth-helpers-react';
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarinaOverviewCard } from "@/components/settings/overview/MarinaOverviewCard";
import { ProfileCompletion } from "@/components/settings/profile/ProfileCompletion";
import { SettingsLoading } from "@/components/settings/loading/SettingsLoading";

export default function Settings() {
  const [marinaDetails, setMarinaDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const session = useSession();
  const { toast } = useToast();

  useEffect(() => {
    if (!session?.user?.id) {
      setIsLoading(false);
      setError("Please log in to access marina settings.");
      return;
    }

    const fetchMarinaDetails = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const { data, error: fetchError } = await supabase
          .from('marina_details')
          .select('*')
          .eq('user_id', session.user.id);

        if (fetchError) throw fetchError;

        const marinaData = data && data.length > 0 ? data[0] : null;
        setMarinaDetails(marinaData);
        
        if (marinaData) {
          const totalFields = Object.keys(marinaData).length;
          const filledFields = Object.values(marinaData).filter(value => 
            value !== null && value !== '' && value !== undefined
          ).length;
          setCompletionPercentage((filledFields / totalFields) * 100);
        }
      } catch (error) {
        console.error('Error:', error);
        setError("Failed to load marina details. Please try again.");
        toast({
          title: "Error",
          description: "Failed to load marina details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarinaDetails();
  }, [session, toast]);

  const handleNavigateToSection = (section: string) => {
    const element = document.querySelector(`[data-section="${section}"]`);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!session?.user?.id) {
    return (
      <PageWithChat>
        <PageContainer>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Please log in to access marina settings.</AlertDescription>
          </Alert>
        </PageContainer>
      </PageWithChat>
    );
  }

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-[#133134]">Marina Information</h1>
              <p className="text-muted-foreground">
                {marinaDetails 
                  ? "Manage your marina's information and settings below." 
                  : "Get started by adding your marina's information."}
              </p>
            </div>
          </div>

          {isLoading ? (
            <SettingsLoading />
          ) : error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <>
              <MarinaOverviewCard marinaDetails={marinaDetails} />
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <Button 
                    onClick={() => document.getElementById('marina-form')?.scrollIntoView({ behavior: 'smooth' })} 
                    variant="outline" 
                    size="sm"
                    className="border-[#133134] text-[#133134] hover:bg-[#133134] hover:text-white"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Information
                  </Button>
                </div>
                <ProfileCompletion 
                  completionPercentage={completionPercentage}
                  onNavigateToSection={handleNavigateToSection}
                />
              </div>

              <div id="marina-form">
                <MarinaForm 
                  initialData={marinaDetails} 
                  onSuccess={() => {
                    toast({
                      title: "Success",
                      description: "Marina details have been saved successfully.",
                    });
                  }}
                />
              </div>
            </>
          )}
        </div>
      </PageContainer>
    </PageWithChat>
  );
}