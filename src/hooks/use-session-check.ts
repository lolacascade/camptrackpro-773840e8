import { useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export const useSessionCheck = () => {
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      if (!currentSession) {
        console.log('Session expired, redirecting to login');
        window.location.href = '/login';
      }
    };

    const interval = setInterval(checkSession, 30000);
    return () => clearInterval(interval);
  }, []);
};