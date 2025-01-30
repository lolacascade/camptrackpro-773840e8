import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { FinancialsOverview } from "@/components/financials/FinancialsOverview";
import { FinancialsHeader } from "@/components/financials/components/FinancialsHeader";
import { AddExpenseDrawer } from "@/components/financials/AddExpenseDrawer";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function Financials() {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  const handleAddExpense = () => {
    setIsAddExpenseOpen(true);
  };

  return (
    <ProtectedRoute>
      <PageWithChat>
        <PageContainer>
          <div className="space-y-6">
            <FinancialsHeader onAdd={handleAddExpense} />
            <FinancialsOverview />
          </div>

          <AddExpenseDrawer
            open={isAddExpenseOpen}
            onClose={() => setIsAddExpenseOpen(false)}
            expense={null}
            onExpenseUpdated={() => {}}
          />
        </PageContainer>
      </PageWithChat>
    </ProtectedRoute>
  );
}