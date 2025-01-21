import { PageContainer } from "@/components/layout/PageContainer";
import { SlotTable } from "@/components/marina/SlotTable";

export default function Map() {
  return (
    <PageContainer>
      <div className="space-y-8">
        <h1 className="text-3xl font-semibold text-[#133134]">Marina Map</h1>
        <SlotTable />
      </div>
    </PageContainer>
  );
}