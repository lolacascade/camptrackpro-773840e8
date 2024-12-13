import { StrictMode } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from "@/integrations/supabase/client";
import { AppRoutes } from "@/components/routing/AppRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // Keep data fresh for 5 minutes
      gcTime: 10 * 60 * 1000, // Cache data for 10 minutes (previously cacheTime)
    },
  },
});

const App = () => {
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