
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "@/hooks/use-supabase-client";
import { useOrganization } from "@/hooks/use-organization";

interface RevenueData {
  category: string;
  amount: number;
}

export function RevenueBreakdown() {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const supabase = useSupabaseClient();
  const { organizationId, accountId } = useOrganization();

  useEffect(() => {
    const fetchRevenueData = async () => {
      if (!organizationId || !accountId) return;

      // Get invoices for income data
      const { data: incomeData, error: incomeError } = await supabase
        .from('invoices')
        .select('amount, type')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId)
        .eq('status', 'paid');

      // Get expenses data
      const { data: expenseData, error: expenseError } = await supabase
        .from('expenses')
        .select('amount, category')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (incomeError) {
        console.error("Error fetching income data:", incomeError);
      } else if (expenseError) {
        console.error("Error fetching expense data:", expenseError);
      } else {
        // Process and combine both datasets
        const combinedData: RevenueData[] = [];

        // Process income data
        if (incomeData) {
          const incomeByType = incomeData.reduce((acc: Record<string, number>, curr) => {
            const type = curr.type || 'General Income';
            const amount = typeof curr.amount === 'number' ? curr.amount : 0;
            acc[type] = (acc[type] || 0) + amount;
            return acc;
          }, {});

          Object.entries(incomeByType).forEach(([type, amount]) => {
            combinedData.push({ category: type, amount });
          });
        }

        // Process expense data
        if (expenseData) {
          const expensesByCategory = expenseData.reduce((acc: Record<string, number>, curr) => {
            const category = curr.category || 'Other Expenses';
            const amount = typeof curr.amount === 'number' ? curr.amount : 0;
            acc[category] = (acc[category] || 0) + amount;
            return acc;
          }, {});

          Object.entries(expensesByCategory).forEach(([category, amount]) => {
            combinedData.push({ category, amount });
          });
        }
        
        setRevenueData(combinedData);
      }
    };

    fetchRevenueData();
  }, [supabase, organizationId, accountId]);

  return (
    <div className="w-full rounded-2xl bg-white p-6">
      <h2 className="text-lg font-semibold mb-4">Revenue Breakdown</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {revenueData.map((item, index) => (
          <Card key={index} className="border border-[#E8EBEB] rounded-xl">
            <CardContent className="pt-6">
              <h3 className="text-md font-medium capitalize">{item.category.replace('_', ' ')}</h3>
              <p className="text-lg font-bold">${item.amount.toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
