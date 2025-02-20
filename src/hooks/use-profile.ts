
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";

interface UserProfile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
}

export function useProfile() {
  const session = useSession();

  return useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) {
        return null;
      }

      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) {
        throw error;
      }

      return {
        id: users.id,
        email: users.email,
        first_name: users.first_name || null,
        last_name: users.last_name || null
      } as UserProfile;
    },
    enabled: !!session?.user?.id
  });
}
