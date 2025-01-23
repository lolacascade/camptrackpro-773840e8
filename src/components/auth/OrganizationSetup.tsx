import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function OrganizationSetup() {
  const [organizationName, setOrganizationName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create organization
      const { data: org, error: orgError } = await supabase
        .from('organizations')
        .insert([{ name: organizationName }])
        .select()
        .single();

      if (orgError) throw orgError;

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user");

      // Create organization role for user
      const { error: roleError } = await supabase
        .from('organization_roles')
        .insert([{
          user_id: user.id,
          organization_id: org.id,
          role: 'admin'
        }]);

      if (roleError) throw roleError;

      // Create checkout session
      const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke(
        'create-checkout-session',
        {
          body: { organizationId: org.id }
        }
      );

      if (checkoutError) throw checkoutError;

      // Redirect to Stripe checkout
      window.location.href = checkoutData.url;

    } catch (error) {
      console.error('Error setting up organization:', error);
      toast({
        title: "Error",
        description: "Failed to set up organization. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6">Set Up Your Organization</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="orgName" className="block text-sm font-medium text-gray-700 mb-1">
            Organization Name
          </label>
          <Input
            id="orgName"
            type="text"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            required
            placeholder="Enter your organization name"
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Setting up..." : "Continue to Payment"}
        </Button>
      </form>
    </div>
  );
}