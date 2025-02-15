
import { PageContainer } from "@/components/layout/PageContainer";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { AssetsContent } from "@/features/assets/components/AssetsContent";

export default function Assets() {
  return (
    <PageWithChat>
      <PageContainer>
        <AssetsContent />
      </PageContainer>
    </PageWithChat>
  );
}
