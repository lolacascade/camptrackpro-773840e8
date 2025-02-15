
import { PageContainer } from "@/components/layout/PageContainer";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { MarinaForm } from "@/components/settings/MarinaForm";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { MarinaOverviewCard } from "@/components/settings/overview/MarinaOverviewCard";
import { ProfileCompletion } from "@/components/settings/profile/ProfileCompletion";
import { SettingsLoading } from "@/components/settings/loading/SettingsLoading";
import { useNavigate } from "react-router-dom";
import { useOrganization } from "@/hooks/use-organization";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function Settings() {
  const [marinaDetails, setMarinaDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { organizationId, accountId, isLoading: isLoadingOrg } = useOrganization();

  useEffect(() => {
    if (!user?.id || !organizationId || !accountId) {
      if (!isLoadingOrg) {
        setIsLoading(false);
        setError("Please log in to access marina settings.");
      }
      return;
    }

    const fetchMarinaDetails = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const { data, error } = await supabase
          .from('marina_details')
          .select('*')
          .eq('organization_id', organizationId)
          .eq('account_id', accountId)
          .maybeSingle();

        if (error) throw error;

        // Initialize an empty marina details object if none exists
        const details = data || {
          name: '',
          address: '',
          contact_email: '',
          contact_phone: '',
          total_slips: null,
          website: '',
          coordinates: { latitude: '', longitude: '' },
          approach_info: { depth: '', width: '', obstacles: '' },
          services_amenities: {
            fuel: false,
            electricity: false,
            water: false,
            pumpout: false,
            maintenance: false
          },
          other_features: {
            restrooms: false,
            showers: false,
            laundry: false,
            parking: false,
            wifi: false
          },
          social_media: {
            facebook: '',
            instagram: '',
            twitter: ''
          }
        };

        setMarinaDetails(details);
        
        if (details) {
          const totalFields = Object.keys(details).length;
          const filledFields = Object.values(details).filter(value => 
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
  }, [user, organizationId, accountId, isLoadingOrg, toast]);

  const handleNavigateToSection = (section: string) => {
    const element = document.querySelector(`[data-section="${section}"]`);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AuthGuard>
      <PageWithChat>
        <PageContainer>
          <div className="space-y-8">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold text-[#133134]">Marina Information</h1>
              <p className="text-muted-foreground">
                {marinaDetails 
                  ? "Manage your marina's information and settings below." 
                  : "Get started by adding your marina's information."}
              </p>
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
                    <ProfileCompletion
                      completionPercentage={completionPercentage}
                      onNavigateToSection={handleNavigateToSection}
                    />
                  </div>
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
    </AuthGuard>
  );
}
