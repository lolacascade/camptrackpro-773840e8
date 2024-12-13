import { PageContainer } from "@/components/layout/PageContainer";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { MarinaForm } from "@/components/settings/MarinaForm";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from '@supabase/auth-helpers-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Settings() {
  const [marinaDetails, setMarinaDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for session first
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

        // Handle the case where no marina details exist yet
        const marinaData = data && data.length > 0 ? data[0] : null;
        setMarinaDetails(marinaData);
        
        // Calculate completion percentage if we have data
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
  }, [session, navigate, toast]);

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
            <div className="space-y-4">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-12 w-1/2" />
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <>
              <Card className="border-2 border-[#133134]/10">
                <CardContent className="p-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h2 className="text-xl font-semibold mb-2 text-[#133134]">
                        {marinaDetails?.name || 'Marina Name Not Set'}
                      </h2>
                      <div className="text-muted-foreground mb-4">
                        {marinaDetails?.address || 'Address Not Set'}
                      </div>
                      <Button 
                        onClick={() => document.getElementById('marina-form')?.scrollIntoView({ behavior: 'smooth' })} 
                        variant="outline" 
                        size="sm"
                        className="border-[#133134] text-[#133134] hover:bg-[#133134] hover:text-white"
                      >
                        Edit Information
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Profile Completion</span>
                          <span>{Math.round(completionPercentage)}%</span>
                        </div>
                        <Progress 
                          value={completionPercentage} 
                          className="h-2 bg-[#133134]/10" 
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
