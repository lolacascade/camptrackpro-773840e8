import { useQuery } from "@tanstack/react-query";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Profile } from "@/types/database/auth";

export function useProfile() {
  const session = useSession();

  return useQuery({
    queryKey: ["profile", session?.user?.id],
    queryFn: async (): Promise<Profile | null> => {
      if (!session?.user?.id) {
        return null;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to fetch user profile");
        throw error;
      }

      return profile;
    },
    enabled: !!session?.user?.id,
  });
}