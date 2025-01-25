import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";

export type RevenueCategory = "all" | "dockage" | "storage" | "maintenance";

interface ChartDataItem {
  date: Date;
  value: number;
  month: string;
  year: string;
}

interface MonthData {
  total: number;
  percentageChange: number;
}

interface RevenueData {
  chartData: ChartDataItem[];
  currentMonth: MonthData;
}

interface Invoice {
  id: string;
  amount: number;
  type: string;
  created_at: string;
}

export function useRevenueData(selectedCategory: RevenueCategory) {
  const { organizationId, accountId } = useOrganization();

  return useQuery<RevenueData>({
    queryKey: ['revenue', selectedCategory, organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        throw new Error('Organization or account context not found');
      }

      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (error) {
        console.error("Error fetching revenue data:", error);
        throw error;
      }

      const invoices = data as Invoice[];
      const chartData = processInvoicesData(invoices);
      const currentMonth = getCurrentMonthData(invoices);

      return {
        chartData,
        currentMonth,
      };
    },
    enabled: !!organizationId && !!accountId,
  });
}

function processInvoicesData(invoices: Invoice[]): ChartDataItem[] {
  const groupedData = invoices.reduce<ChartDataItem[]>((acc, invoice) => {
    const date = new Date(invoice.created_at);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    const existingMonth = acc.find(item => 
      item.month === String(date.getMonth() + 1) && 
      item.year === String(date.getFullYear())
    );

    if (existingMonth) {
      existingMonth.value += Number(invoice.amount) || 0;
    } else {
      acc.push({
        date: new Date(date.getFullYear(), date.getMonth(), 1),
        value: Number(invoice.amount) || 0,
        month: String(date.getMonth() + 1),
        year: String(date.getFullYear()),
      });
    }

    return acc;
  }, []);

  return groupedData.sort((a, b) => a.date.getTime() - b.date.getTime());
}

function getCurrentMonthData(invoices: Invoice[]): MonthData {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const currentMonthTotal = invoices
    .filter(invoice => {
      const date = new Date(invoice.created_at);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    })
    .reduce((sum, invoice) => sum + (Number(invoice.amount) || 0), 0);

  const lastMonthTotal = invoices
    .filter(invoice => {
      const date = new Date(invoice.created_at);
      return date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear;
    })
    .reduce((sum, invoice) => sum + (Number(invoice.amount) || 0), 0);

  const percentageChange = lastMonthTotal === 0 
    ? 100 
    : ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;

  return {
    total: currentMonthTotal,
    percentageChange,
  };
}