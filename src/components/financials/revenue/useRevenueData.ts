import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import { format, differenceInDays, parseISO, compareAsc } from "date-fns";
import { ChartDataProcessorProps } from "./types";

export function useRevenueData(dateRange: { from: Date; to: Date }) {
  const { organizationId, accountId } = useOrganization();
  const daysDifference = differenceInDays(dateRange.to, dateRange.from);
  const showDailyData = daysDifference <= 31;

  return useQuery({
    queryKey: ['financial-data', organizationId, accountId, dateRange.from, dateRange.to, showDailyData],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        throw new Error("Organization or account context not found");
      }

      const [incomeResponse, expensesResponse] = await Promise.all([
        supabase
          .from('invoices')
          .select('amount, created_at')
          .gte('created_at', dateRange.from.toISOString())
          .lte('created_at', dateRange.to.toISOString())
          .eq('status', 'paid')
          .eq('organization_id', organizationId)
          .eq('account_id', accountId),
        
        supabase
          .from('expenses')
          .select('amount, date')
          .gte('date', dateRange.from.toISOString())
          .lte('date', dateRange.to.toISOString())
          .eq('organization_id', organizationId)
          .eq('account_id', accountId)
      ]);

      if (incomeResponse.error) throw incomeResponse.error;
      if (expensesResponse.error) throw expensesResponse.error;

      return processChartData({
        incomeData: incomeResponse.data || [],
        expensesData: expensesResponse.data || [],
        dateRange,
        showDailyData
      });
    },
    enabled: !!organizationId && !!accountId,
  });
}

function processChartData({ incomeData, expensesData, dateRange, showDailyData }: ChartDataProcessorProps) {
  if (showDailyData) {
    return processDailyData(incomeData, expensesData, dateRange);
  }
  return processMonthlyData(incomeData, expensesData);
}

function processDailyData(incomeData: any[], expensesData: any[], dateRange: { from: Date; to: Date }) {
  const dailyData: { [key: string]: any } = {};
  
  // Initialize all days
  let currentDate = new Date(dateRange.from);
  while (currentDate <= dateRange.to) {
    const key = format(currentDate, 'yyyy-MM-dd');
    dailyData[key] = {
      month: format(currentDate, 'MMM dd'),
      year: format(currentDate, 'yyyy'),
      income: 0,
      expenses: 0,
      netProfit: 0,
      date: new Date(currentDate),
    };
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Aggregate income
  incomeData.forEach((invoice) => {
    const date = new Date(invoice.created_at);
    const key = format(date, 'yyyy-MM-dd');
    if (dailyData[key]) {
      dailyData[key].income += Number(invoice.amount);
    }
  });

  // Aggregate expenses
  expensesData.forEach((expense) => {
    const date = new Date(expense.date);
    const key = format(date, 'yyyy-MM-dd');
    if (dailyData[key]) {
      dailyData[key].expenses += Number(expense.amount);
    }
  });

  // Convert to array and sort by date
  return Object.values(dailyData)
    .map(data => ({
      ...data,
      netProfit: data.income - data.expenses
    }))
    .sort((a, b) => compareAsc(a.date, b.date));
}

function processMonthlyData(incomeData: any[], expensesData: any[]) {
  const monthlyData: { [key: string]: any } = {};

  // Helper function to create month key for sorting
  const createMonthKey = (date: Date) => format(date, 'yyyy-MM');
  
  // Process income data
  incomeData.forEach((invoice) => {
    const date = parseISO(invoice.created_at);
    const key = createMonthKey(date);
    if (!monthlyData[key]) {
      monthlyData[key] = {
        month: format(date, 'MMM'),
        year: format(date, 'yyyy'),
        income: 0,
        expenses: 0,
        netProfit: 0,
        date: date,
      };
    }
    monthlyData[key].income += Number(invoice.amount);
  });

  // Process expense data
  expensesData.forEach((expense) => {
    const date = parseISO(expense.date);
    const key = createMonthKey(date);
    if (!monthlyData[key]) {
      monthlyData[key] = {
        month: format(date, 'MMM'),
        year: format(date, 'yyyy'),
        income: 0,
        expenses: 0,
        netProfit: 0,
        date: date,
      };
    }
    monthlyData[key].expenses += Number(expense.amount);
  });

  // Convert to array, calculate net profit, and sort by date
  return Object.values(monthlyData)
    .map(data => ({
      ...data,
      netProfit: data.income - data.expenses
    }))
    .sort((a, b) => compareAsc(a.date, b.date));
}