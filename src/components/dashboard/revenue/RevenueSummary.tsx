import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, startOfMonth, endOfMonth } from "date-fns";

export function RevenueSummary() {
  const { data: revenue } = useQuery({
    queryKey: ['revenue-summary'],
    queryFn: async () => {
      const startDate = startOfMonth(new Date()).toISOString();
      const endDate = endOfMonth(new Date()).toISOString();
      
      const { data: currentMonth } = await supabase
        .from('invoices')
        .select('amount, status, type')  // Add 'type' to the select
        .gte('issued_date', startDate)
        .lte('issued_date', endDate);
      
      const totalRevenue = currentMonth?.reduce((sum, invoice) => 
        invoice.status === 'paid' ? sum + Number(invoice.amount) : sum, 0
      ) || 0;

      // Group by revenue source
      const revenueSources = currentMonth?.reduce((acc, invoice) => {
        if (invoice.status !== 'paid') return acc;
        const source = invoice.type || 'Other';
        acc[source] = (acc[source] || 0) + Number(invoice.amount);
        return acc;
      }, {} as Record<string, number>) || {};

      // Find top source
      const topSource = Object.entries(revenueSources)
        .sort(([,a], [,b]) => b - a)[0] || ['None', 0];

      return {
        total: totalRevenue,
        topSource: {
          name: topSource[0],
          amount: topSource[1],
          percentage: totalRevenue ? Math.round((topSource[1] / totalRevenue) * 100) : 0
        }
      };
    }
  });

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Revenue Summary - {format(new Date(), 'MMMM yyyy')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold">
              ${revenue?.total.toLocaleString() || '0'}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Top Revenue Source</p>
            <p className="text-lg font-semibold">
              {revenue?.topSource.name}: ${revenue?.topSource.amount.toLocaleString()} 
              <span className="text-sm text-muted-foreground ml-2">
                ({revenue?.topSource.percentage}% of total)
              </span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}