import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/types/common/person";
import { useToast } from "./use-toast";

export function useProfile() {
  const { toast } = useToast();

  return useQuery({
    queryKey: ["profile"],
    queryFn: async (): Promise<Profile | null> => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("No authenticated user");
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error",
          description: "Failed to fetch profile data",
          variant: "destructive",
        });
        throw error;
      }

      if (!profile) {
        console.warn("No profile found for user:", user.id);
        return null;
      }

      return {
        id: profile.id,
        role: profile.role,
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
      };
    },
    retry: 1,
    meta: {
      errorMessage: "Failed to fetch profile",
    }
  });
}