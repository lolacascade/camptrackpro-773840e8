
import { PageContainer } from "@/components/layout/PageContainer";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { RVsContent } from "@/features/rvs/components/RVsContent";

export default function RVs() {
  return (
    <PageWithChat>
      <PageContainer>
        <RVsContent />
      </PageContainer>
    </PageWithChat>
  );
}
