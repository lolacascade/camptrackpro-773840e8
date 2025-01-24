import { Link } from "react-router-dom";
import { AuthContainer } from "@/components/auth/AuthContainer";
import { AuthLogo } from "@/components/auth/AuthLogo";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <AuthContainer>
      <AuthLogo />
      <div className="bg-white rounded-lg shadow-xl p-8 mt-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Welcome to CampTrackPro
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Manage your RV park efficiently with our comprehensive management solution.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link to="/login">
              <Button variant="default" size="lg" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
}