import { PageContainer } from "@/components/layout/PageContainer";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { FinancialsOverview } from "@/components/financials/FinancialsOverview";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function Financials() {
  return (
    <ProtectedRoute>
      <PageWithChat>
        <PageContainer>
          <FinancialsOverview />
        </PageContainer>
      </PageWithChat>
    </ProtectedRoute>
  );
}