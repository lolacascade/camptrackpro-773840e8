import { PageContainer } from "@/components/layout/PageContainer";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { FinancialsOverview } from "@/components/financials/FinancialsOverview";

export default function Financials() {
  return (
    <PageWithChat>
      <PageContainer>
        <FinancialsOverview />
      </PageContainer>
    </PageWithChat>
  );
}