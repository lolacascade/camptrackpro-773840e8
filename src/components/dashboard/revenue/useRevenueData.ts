import { useQuery } from "@tanstack/react-query";
import { RevenueCategory, RevenueData } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";

interface ChartDataItem {
  monthKey: string;
  date: Date;
  amount: number;
  month: string;
  year: string;
  slipRenewals: number;
  newSlipRentals: number;
  maintenanceServices: number;
}

interface RevenueQueryData {
  chartData: ChartDataItem[];
  currentMonth: {
    date: Date;
    month: string;
    year: string;
    slipRenewals: number;
    newSlipRentals: number;
    maintenanceServices: number;
    total: number;
    count: number;
  };
}

export function useRevenueData(selectedCategory: RevenueCategory) {
  const { organizationId, accountId } = useOrganization();

  return useQuery<RevenueQueryData>({
    queryKey: ['revenue-breakdown', selectedCategory, organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        throw new Error("Organization or account context not found");
      }

      const { data: invoices, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (error) {
        console.error('Error fetching revenue data:', error);
        throw error;
      }

      // Process invoices into chart data
      const chartData = processInvoicesData(invoices);
      const currentMonth = getCurrentMonthData(invoices);

      return {
        chartData,
        currentMonth
      };
    },
    enabled: !!organizationId && !!accountId
  });
}

function processInvoicesData(invoices: any[]): ChartDataItem[] {
  // Group invoices by month and calculate totals
  const groupedData = invoices.reduce((acc: ChartDataItem[], invoice) => {
    const date = new Date(invoice.created_at);
    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
    
    const existingMonth = acc.find(item => item.monthKey === monthKey);
    if (existingMonth) {
      existingMonth.amount += invoice.amount;
    } else {
      acc.push({
        monthKey,
        date,
        amount: invoice.amount,
        month: date.toLocaleString('default', { month: 'short' }),
        year: date.getFullYear().toString(),
        slipRenewals: 0,
        newSlipRentals: 0,
        maintenanceServices: 0
      });
    }
    return acc;
  }, []);

  return groupedData.sort((a, b) => a.date.getTime() - b.date.getTime());
}

function getCurrentMonthData(invoices: any[]) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const currentMonthInvoices = invoices.filter(invoice => {
    const invoiceDate = new Date(invoice.created_at);
    return invoiceDate.getMonth() === currentMonth && 
           invoiceDate.getFullYear() === currentYear;
  });

  return {
    date: currentDate,
    month: currentDate.toLocaleString('default', { month: 'short' }),
    year: currentYear.toString(),
    slipRenewals: 0,
    newSlipRentals: 0,
    maintenanceServices: 0,
    total: currentMonthInvoices.reduce((sum, invoice) => sum + invoice.amount, 0),
    count: currentMonthInvoices.length
  };
}