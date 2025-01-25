import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import { RevenueCategory } from "./types";

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

interface MonthData {
  date: Date;
  month: string;
  year: string;
  slipRenewals: number;
  newSlipRentals: number;
  maintenanceServices: number;
  total: number;
  count: number;
}

interface RevenueQueryResult {
  chartData: ChartDataItem[];
  currentMonth: MonthData;
}

type Invoice = {
  id: string;
  amount: number;
  type: string;
  created_at: string;
};

export function useRevenueData(selectedCategory: RevenueCategory) {
  const { organizationId, accountId } = useOrganization();

  return useQuery<RevenueQueryResult>({
    queryKey: ['revenue-breakdown', selectedCategory, organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        throw new Error("Missing organization or account context");
      }

      const { data: invoices, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId) as { data: Invoice[] | null; error: any };

      if (error) {
        console.error("Error fetching revenue data:", error);
        throw error;
      }

      const chartData = processInvoicesData(invoices || []);
      const currentMonth = getCurrentMonthData(invoices || []);

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
    
    const existingMonth = acc.find(item => item.monthKey === monthKey);
    
    if (existingMonth) {
      existingMonth.amount += invoice.amount || 0;
      if (invoice.type === 'slip_renewal') existingMonth.slipRenewals += 1;
      if (invoice.type === 'new_slip') existingMonth.newSlipRentals += 1;
      if (invoice.type === 'maintenance') existingMonth.maintenanceServices += 1;
    } else {
      acc.push({
        monthKey,
        date,
        month: date.toLocaleString('default', { month: 'short' }),
        year: date.getFullYear().toString(),
        amount: invoice.amount || 0,
        slipRenewals: invoice.type === 'slip_renewal' ? 1 : 0,
        newSlipRentals: invoice.type === 'new_slip' ? 1 : 0,
        maintenanceServices: invoice.type === 'maintenance' ? 1 : 0,
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
  
  const currentMonthInvoices = invoices.filter(invoice => {
    const invoiceDate = new Date(invoice.created_at);
    return invoiceDate.getMonth() === currentMonth && 
           invoiceDate.getFullYear() === currentYear;
  });

  return {
    date: currentDate,
    month: currentDate.toLocaleString('default', { month: 'long' }),
    year: currentYear.toString(),
    slipRenewals: currentMonthInvoices.filter(i => i.type === 'slip_renewal').length,
    newSlipRentals: currentMonthInvoices.filter(i => i.type === 'new_slip').length,
    maintenanceServices: currentMonthInvoices.filter(i => i.type === 'maintenance').length,
    total: currentMonthInvoices.reduce((sum, invoice) => sum + (invoice.amount || 0), 0),
    count: currentMonthInvoices.length
  };
}