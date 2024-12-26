import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function RevenueBreakdown() {
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchRevenueData = async () => {
      const { data, error } = await supabase
        .from('revenue')
        .select('*');

      if (error) {
        console.error("Error fetching revenue data:", error);
      } else {
        setRevenueData(data);
      }
    };

    fetchRevenueData();
  }, []);

  return (
    <div className="w-full rounded-2xl bg-white p-6">
      <h2 className="text-lg font-semibold mb-4">Revenue Breakdown</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {revenueData.map((item) => (
          <Card key={item.id} className="border border-[#E8EBEB] rounded-xl">
            <CardContent>
              <h3 className="text-md font-medium">{item.category}</h3>
              <p className="text-lg font-bold">${item.amount.toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
