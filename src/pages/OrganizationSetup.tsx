import { OrganizationSetup } from "@/components/auth/OrganizationSetup";
import { AuthContainer } from "@/components/auth/AuthContainer";

export default function OrganizationSetupPage() {
  return (
    <AuthContainer>
      <OrganizationSetup />
    </AuthContainer>
  );
}