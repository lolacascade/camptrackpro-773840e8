import { useState } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { FinancialsOverview } from "@/components/financials/FinancialsOverview";
import { FinancialsHeader } from "@/components/financials/components/FinancialsHeader";
import { AddExpenseDrawer } from "@/components/financials/AddExpenseDrawer";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { startOfMonth } from "date-fns";

export default function Financials() {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  const handleAddExpense = () => {
    setIsAddExpenseOpen(true);
  };

  const handleDateRangeChange = (range: { from: Date; to: Date }) => {
    setDateRange(range);
  };

  return (
    <ProtectedRoute>
      <PageWithChat>
        <PageContainer>
          <div className="space-y-6">
            <FinancialsHeader 
              onAdd={handleAddExpense} 
              onDateRangeChange={handleDateRangeChange}
            />
            <FinancialsOverview dateRange={dateRange} />
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