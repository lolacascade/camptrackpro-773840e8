
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { OrganizationProvider } from "@/contexts/OrganizationContext";
import { AppRoutes } from "@/components/routing/AppRoutes";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import "./App.css";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <OrganizationProvider>
            <AppRoutes />
            <Toaster />
            <SonnerToaster position="top-right" />
          </OrganizationProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
