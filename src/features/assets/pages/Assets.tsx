
import { PageContainer } from "@/components/layout/PageContainer";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { AssetsProvider } from "../context/AssetsProvider";
import { AssetsLayout } from "../components/AssetsLayout";

export default function Assets() {
  return (
    <AssetsProvider>
      <PageWithChat>
        <PageContainer>
          <AssetsLayout />
        </PageContainer>
      </PageWithChat>
    </AssetsProvider>
  );
}
