import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import { RevenueCategory, RevenueData, MonthData, ChartDataItem } from "./types";

interface Invoice {
  id: string;
  amount: number;
  type: string;
  created_at: string;
}

interface QueryResult {
  chartData: ChartDataItem[];
  currentMonth: MonthData;
}

export function useRevenueData(selectedCategory: RevenueCategory) {
  const { organizationId, accountId } = useOrganization();

  return useQuery<QueryResult>({
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
      const chartData = processInvoicesData(invoices, selectedCategory);
      const currentMonth = getCurrentMonthData(invoices);

      return {
        chartData,
        currentMonth,
      };
    },
    enabled: !!organizationId && !!accountId,
  });
}

function processInvoicesData(invoices: Invoice[], category: RevenueCategory): ChartDataItem[] {
  return invoices.reduce<ChartDataItem[]>((acc, invoice) => {
    if (category !== 'all' && invoice.type !== category) {
      return acc;
    }

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
  }, []).sort((a, b) => a.date.getTime() - b.date.getTime());
}

function getCurrentMonthData(invoices: Invoice[]): MonthData {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const currentMonthData = {
    slipRenewals: 0,
    newSlipRentals: 0,
    maintenanceServices: 0,
    percentageChange: 0
  };

  // Calculate totals for current month
  invoices.forEach(invoice => {
    const date = new Date(invoice.created_at);
    if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
      switch (invoice.type) {
        case 'dockage':
          currentMonthData.slipRenewals += Number(invoice.amount) || 0;
          break;
        case 'storage':
          currentMonthData.newSlipRentals += Number(invoice.amount) || 0;
          break;
        case 'maintenance':
          currentMonthData.maintenanceServices += Number(invoice.amount) || 0;
          break;
      }
    }
  });

  // Calculate percentage change
  const lastMonthTotal = invoices
    .filter(invoice => {
      const date = new Date(invoice.created_at);
      return date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear;
    })
    .reduce((sum, invoice) => sum + (Number(invoice.amount) || 0), 0);

  const currentMonthTotal = currentMonthData.slipRenewals + 
                          currentMonthData.newSlipRentals + 
                          currentMonthData.maintenanceServices;

  currentMonthData.percentageChange = lastMonthTotal === 0 
    ? 100 
    : ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;

  return currentMonthData;
}