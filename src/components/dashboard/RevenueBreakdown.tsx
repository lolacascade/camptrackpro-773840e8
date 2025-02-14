
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useSupabaseClient } from "@/hooks/use-supabase-client";

interface RevenueData {
  category: string;
  amount: number;
}

export function RevenueBreakdown() {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const supabase = useSupabaseClient();

  useEffect(() => {
    const fetchRevenueData = async () => {
      const { data, error } = await supabase
        .from('invoices')
        .select(`type, amount`)
        .eq('status', 'paid');

      if (error) {
        console.error("Error fetching revenue data:", error);
      } else if (data) {
        const groupedData = data.reduce((acc: RevenueData[], curr) => {
          const existingCategory = acc.find(item => item.category === curr.type);
          if (existingCategory) {
            existingCategory.amount += curr.amount;
          } else {
            acc.push({ category: curr.type, amount: curr.amount });
          }
          return acc;
        }, []);
        
        setRevenueData(groupedData);
      }
    };

    fetchRevenueData();
  }, [supabase]);

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
