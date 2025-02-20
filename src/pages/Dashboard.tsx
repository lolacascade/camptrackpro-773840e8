
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";

export default function Dashboard() {
  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-8">
          <h1 className="text-3xl font-semibold text-[#133134]">RV Park Dashboard</h1>
          <p className="text-gray-600">Welcome to your RV Park management system.</p>
        </div>
      </PageContainer>
    </PageWithChat>
  );
}
