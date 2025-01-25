import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { SiteTable } from "@/components/sites/SiteTable";

export default function Sitemap() {
  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-[#133134]">RV Sites</h1>
          </div>
          <SiteTable />
        </div>
      </PageContainer>
    </PageWithChat>
  );
}