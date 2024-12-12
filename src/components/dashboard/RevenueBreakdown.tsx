import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { format, subMonths, addMonths } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

type RevenueCategory = "all" | "renewals" | "new_rentals" | "maintenance";

interface Annotation {
  month: string;
  text: string;
  type: "positive" | "negative" | "neutral";
}

export function RevenueBreakdown() {
  const [selectedCategory, setSelectedCategory] = useState<RevenueCategory>("all");
  const currentDate = new Date();
  const isMobile = useIsMobile();

  const { data, isLoading } = useQuery({
    queryKey: ['revenue-breakdown', selectedCategory],
    queryFn: async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return generateMonthlyData();
    }
  });

  const annotations: Annotation[] = [
    { month: format(currentDate, 'MMM yyyy'), text: "Peak seasonal demand", type: "positive" },
    { month: format(subMonths(currentDate, 1), 'MMM yyyy'), text: "Maintenance revenue increased", type: "positive" },
    { month: format(subMonths(currentDate, 2), 'MMM yyyy'), text: "Weather impact on rentals", type: "negative" },
  ];

  const generateMonthlyData = () => {
    const data = [];
    for (let i = -12; i <= 11; i++) {
      const date = i === 0 ? currentDate : (i < 0 ? subMonths(currentDate, Math.abs(i)) : addMonths(currentDate, i));
      const monthData = {
        date: date,
        month: format(date, 'MMM'),
        year: format(date, 'yyyy'),
        slipRenewals: Math.random() * 8000 + 2000,
        newSlipRentals: Math.random() * 8000 + 2000,
        maintenanceServices: Math.random() * 3000 + 1000,
      };

      // Filter data based on selected category
      if (selectedCategory !== "all") {
        const categoryMap = {
          renewals: "slipRenewals",
          new_rentals: "newSlipRentals",
          maintenance: "maintenanceServices"
        };
        const filteredData = {
          ...monthData,
          [categoryMap[selectedCategory]]: monthData[categoryMap[selectedCategory]],
        };
        data.push(filteredData);
      } else {
        data.push(monthData);
      }
    }
    return data;
  };

  const averageRevenue = data?.reduce((acc, curr) => 
    acc + (curr.slipRenewals + curr.newSlipRentals + curr.maintenanceServices), 0
  ) / (data?.length || 1);

  if (isLoading) {
    return (
      <Card className="col-span-2 border border-[#E8EBEB] rounded-xl bg-transparent mb-8">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle className="text-[#0D1D1F] text-2xl">Revenue Breakdown</CardTitle>
          <Skeleton className="h-10 w-[200px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className={cn(
            "w-full",
            isMobile ? "h-[400px]" : "h-[300px]"
          )} />
        </CardContent>
      </Card>
    );
  }

  const currentMonthData = data?.find(item => 
    format(item.date, 'MMM yyyy') === format(currentDate, 'MMM yyyy')
  );

  return (
    <Card className="col-span-2 border border-[#E8EBEB] rounded-xl bg-transparent mb-8">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <CardTitle className="text-[#0D1D1F] text-2xl">Revenue Breakdown</CardTitle>
        <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as RevenueCategory)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="renewals">Slip Renewals</SelectItem>
            <SelectItem value="new_rentals">New Rentals</SelectItem>
            <SelectItem value="maintenance">Maintenance Services</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF1493]"></div>
              <span className="text-[#0D1D1F] text-base">Slip Renewals</span>
            </div>
            <div className="mt-2">
              <div className="text-[#0D1D1F] text-2xl font-bold">
                ${(currentMonthData?.slipRenewals || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[#3E4238] text-base">↑ 5% compared to previous month</div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#32CD32]"></div>
              <span className="text-[#0D1D1F] text-base">New Rentals</span>
            </div>
            <div className="mt-2">
              <div className="text-[#0D1D1F] text-2xl font-bold">
                ${(currentMonthData?.newSlipRentals || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[#3E4238] text-base">↑ 10% compared to previous month</div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FFA500]"></div>
              <span className="text-[#0D1D1F] text-base">Maintenance Services</span>
            </div>
            <div className="mt-2">
              <div className="text-[#0D1D1F] text-2xl font-bold">
                ${(currentMonthData?.maintenanceServices || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[#3E4238] text-base">Stable month-over-month</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {annotations.map((annotation, index) => (
              <Badge 
                key={index}
                variant={annotation.type === "positive" ? "default" : 
                        annotation.type === "negative" ? "destructive" : 
                        "secondary"}
              >
                {annotation.month}: {annotation.text}
              </Badge>
            ))}
          </div>

          <div className={cn(
            "w-full",
            isMobile ? "h-[400px]" : "h-[300px]"
          )}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#BFC6B3/20" />
                <XAxis 
                  dataKey="month"
                  tick={{ fontSize: 16, fill: '#0D1D1F' }}
                  tickFormatter={(value, index) => {
                    const item = data[index];
                    return `${item.month}\n${item.year}`;
                  }}
                />
                <YAxis 
                  tick={{ fontSize: 16, fill: '#0D1D1F' }}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const annotation = annotations.find(a => a.month === format(payload[0].payload.date, 'MMM yyyy'));
                      
                      return (
                        <div className="bg-white p-4 rounded-lg shadow-lg border border-[#BFC6B3]/20 text-base">
                          <p className="font-bold text-[#0D1D1F]">{`${label} ${payload[0]?.payload.year}`}</p>
                          {selectedCategory === "all" && (
                            <>
                              <p className="text-[#0D1D1F]">
                                <span className="inline-block w-3 h-3 rounded-full bg-[#FF1493] mr-2"></span>
                                {`Slip Renewals: $${payload[0]?.value.toLocaleString()}`}
                              </p>
                              <p className="text-[#0D1D1F]">
                                <span className="inline-block w-3 h-3 rounded-full bg-[#32CD32] mr-2"></span>
                                {`New Rentals: $${payload[1]?.value.toLocaleString()}`}
                              </p>
                              <p className="text-[#0D1D1F]">
                                <span className="inline-block w-3 h-3 rounded-full bg-[#FFA500] mr-2"></span>
                                {`Maintenance: $${payload[2]?.value.toLocaleString()}`}
                              </p>
                            </>
                          )}
                          {annotation && (
                            <p className={cn(
                              "mt-2 text-sm",
                              annotation.type === "positive" ? "text-green-600" :
                              annotation.type === "negative" ? "text-red-600" :
                              "text-gray-600"
                            )}>
                              {annotation.text}
                            </p>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine 
                  y={averageRevenue} 
                  label="Average Revenue" 
                  stroke="#666" 
                  strokeDasharray="3 3" 
                />
                {(selectedCategory === "all" || selectedCategory === "renewals") && (
                  <Bar dataKey="slipRenewals" fill="#FF1493" />
                )}
                {(selectedCategory === "all" || selectedCategory === "new_rentals") && (
                  <Bar dataKey="newSlipRentals" fill="#32CD32" />
                )}
                {(selectedCategory === "all" || selectedCategory === "maintenance") && (
                  <Bar dataKey="maintenanceServices" fill="#FFA500" />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}