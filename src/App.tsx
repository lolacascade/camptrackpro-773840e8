import { StrictMode } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from "@/integrations/supabase/client";
import { AppRoutes } from "@/components/routing/AppRoutes";
import { useEffect } from 'react';
import { toast } from 'sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

const App = () => {
  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        // Clear query cache on sign out
        queryClient.clear();
      }
      
      if (event === 'TOKEN_REFRESHED') {
        console.log('Auth token refreshed successfully');
      }

      if (event === 'USER_UPDATED') {
        console.log('User profile updated');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <StrictMode>
      <SessionContextProvider 
        supabaseClient={supabase}
        initialSession={null}
      >
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </SessionContextProvider>
    </StrictMode>
  );
};

export default App;