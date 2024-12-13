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
import { AlertCircle, MapPin } from "lucide-react";
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

        const marinaData = data && data.length > 0 ? data[0] : null;
        setMarinaDetails(marinaData);
        
        // Calculate completion percentage
        if (marinaData) {
          const totalFields = Object.keys(marinaData).length;
          const filledFields = Object.values(marinaData).filter(value => 
            value !== null && value !== '' && value !== undefined
          ).length;
          setCompletionPercentage((filledFields / totalFields) * 100);
        }
      } catch (error) {
        console.error('Error:', error);
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarinaDetails();
  }, [session, navigate]);

  const handleEdit = () => {
    // Scroll to form
    document.getElementById('marina-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!session?.user?.id) {
    return null;
  }

  return (
    <PageWithChat>
      <div className="space-y-8 px-4 md:px-8 py-6">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-[#133134]">Marina Information</h1>
          <p className="text-muted-foreground">
            {marinaDetails 
              ? "Manage your marina's information and settings below." 
              : "Get started by adding your marina's information."}
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-12 w-1/2" />
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <>
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      {marinaDetails?.name || 'Marina Name Not Set'}
                    </h2>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      {marinaDetails?.address || 'Address Not Set'}
                    </div>
                    <Button onClick={handleEdit} variant="outline" size="sm">
                      Edit Information
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Profile Completion</span>
                        <span>{Math.round(completionPercentage)}%</span>
                      </div>
                      <Progress value={completionPercentage} className="h-2" />
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
    </PageWithChat>
  );
}