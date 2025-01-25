import { useState } from "react";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { SlotTable } from "@/components/slots/SlotTable";

export default function Sitemap() {
  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-[#133134]">RV Sites</h1>
          </div>
          <SlotTable />
        </div>
      </PageContainer>
    </PageWithChat>
  );
}