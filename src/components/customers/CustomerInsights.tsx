import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { Users, UserPlus, Activity, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfMonth, subMonths, endOfMonth, format, addMonths } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export function CustomerInsights() {
  // Get current month's customers with proper ISO string formatting
  const currentMonthStart = startOfMonth(new Date());
  const currentMonthEnd = endOfMonth(new Date());
  const lastMonthStart = startOfMonth(subMonths(new Date(), 1));
  const lastMonthEnd = endOfMonth(subMonths(new Date(), 1));
  const threeMonthsAgo = subMonths(new Date(), 3);

  // Generate monthly data for the chart (12 months back, current, 2 months projected)
  const generateMonthlyData = () => {
    const data = [];
    for (let i = -12; i <= 2; i++) {
      const date = i === 0 ? new Date() : (i < 0 ? subMonths(new Date(), Math.abs(i)) : addMonths(new Date(), i));
      const isProjected = i > 0;
      
      // Random data for demonstration - replace with actual data
      let newCustomers = Math.floor(Math.random() * 15) + 5;
      let websiteAcquisitions = Math.floor(newCustomers * 0.6);
      let referralAcquisitions = newCustomers - websiteAcquisitions;
      
      if (isProjected) {
        // Projected values show slight growth
        newCustomers = Math.floor(newCustomers * 1.1);
        websiteAcquisitions = Math.floor(newCustomers * 0.65);
        referralAcquisitions = newCustomers - websiteAcquisitions;
      }
      
      data.push({
        date,
        month: format(date, 'MMM'),
        year: format(date, 'yyyy'),
        newCustomers,
        websiteAcquisitions,
        referralAcquisitions,
        isProjected
      });
    }
    return data;
  };

  const { data: customerStats } = useQuery({
    queryKey: ['customer-stats'],
    queryFn: async () => {
      console.log('Fetching customer stats...');
      
      // Get current month's total customers
      const { data: currentMonthCustomers, error: currentError } = await supabase
        .from('customers')
        .select('id')
        .lte('created_at', currentMonthEnd.toISOString());

      if (currentError) {
        console.error('Current month error:', currentError);
        throw currentError;
      }

      // Get last month's total customers
      const { data: lastMonthCustomers, error: lastError } = await supabase
        .from('customers')
        .select('id')
        .lte('created_at', lastMonthEnd.toISOString());

      if (lastError) {
        console.error('Last month error:', lastError);
        throw lastError;
      }

      // Get active customers (created in last 3 months)
      const { data: activeCustomers, error: activeError } = await supabase
        .from('customers')
        .select('id')
        .gte('created_at', threeMonthsAgo.toISOString());

      if (activeError) {
        console.error('Active customers error:', activeError);
        throw activeError;
      }

      console.log('Current month customers:', currentMonthCustomers?.length);
      console.log('Last month customers:', lastMonthCustomers?.length);
      console.log('Active customers:', activeCustomers?.length);

      const currentTotal = currentMonthCustomers?.length || 0;
      const lastTotal = lastMonthCustomers?.length || 0;
      const activeTotal = activeCustomers?.length || 0;
      const inactiveTotal = currentTotal - activeTotal;

      const percentageChange = lastTotal > 0 
        ? ((currentTotal - lastTotal) / lastTotal) * 100 
        : 0;

      return {
        currentTotal,
        lastTotal,
        activeTotal,
        inactiveTotal,
        percentageChange: Math.round(percentageChange * 10) / 10 // Round to 1 decimal
      };
    }
  });

  const chartData = generateMonthlyData();
  const currentMonthData = chartData.find(data => 
    format(data.date, 'MMM yyyy') === format(new Date(), 'MMM yyyy')
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <EnhancedStatCard
          title="Total Customers"
          value={customerStats?.currentTotal.toString() || "0"}
          icon={Users}
          trend={{
            value: `${Math.abs(customerStats?.percentageChange || 0)}%`,
            isPositive: (customerStats?.percentageChange || 0) >= 0,
            comparedTo: "last month"
          }}
          breakdown={[
            { 
              label: "Active", 
              value: customerStats?.activeTotal.toString() || "0", 
              percentage: customerStats?.currentTotal ? Math.round((customerStats.activeTotal / customerStats.currentTotal) * 100) : 0 
            },
            { 
              label: "Inactive", 
              value: customerStats?.inactiveTotal.toString() || "0", 
              percentage: customerStats?.currentTotal ? Math.round((customerStats.inactiveTotal / customerStats.currentTotal) * 100) : 0 
            }
          ]}
        />
        <EnhancedStatCard
          title="New Customers"
          value="8"
          icon={UserPlus}
          trend={{
            value: "2 customers",
            isPositive: true,
            comparedTo: "last month"
          }}
          breakdown={[
            { label: "Website", value: "5", percentage: 63 },
            { label: "Referrals", value: "3", percentage: 37 }
          ]}
        />
        <EnhancedStatCard
          title="Active Engagement"
          value="78%"
          icon={Activity}
          trend={{
            value: "3%",
            isPositive: true,
            comparedTo: "last month"
          }}
          breakdown={[
            { label: "Bookings", value: "60%", percentage: 60 },
            { label: "Reviews", value: "18%", percentage: 18 }
          ]}
        />
        <EnhancedStatCard
          title="Customer Rating"
          value="4.8/5"
          icon={Star}
          trend={{
            value: "0.2",
            isPositive: true,
            comparedTo: "last rating"
          }}
          breakdown={[
            { label: "Service", value: "4.9/5", percentage: 95 },
            { label: "Communication", value: "4.7/5", percentage: 90 }
          ]}
        />
      </div>

      <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-[#133134] text-2xl">Customer Acquisition Trends</CardTitle>
          <div className="flex items-center gap-4">
            <button className="text-[#133134] text-base">&lt;</button>
            <span className="text-[#133134] text-base font-medium">
              {format(new Date(), 'MMM yyyy')}
            </span>
            <button className="text-[#133134] text-base">&gt;</button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#0EA5E9]"></div>
                <span className="text-[#133134] text-base">New Customers</span>
              </div>
              <div className="mt-2">
                <div className="text-[#133134] text-2xl font-bold">
                  {currentMonthData?.newCustomers || 0}
                </div>
                <div className="text-[#3E4238] text-base">↑ 8% compared to previous month</div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#F97316]"></div>
                <span className="text-[#133134] text-base">Website Acquisitions</span>
              </div>
              <div className="mt-2">
                <div className="text-[#133134] text-2xl font-bold">
                  {currentMonthData?.websiteAcquisitions || 0}
                </div>
                <div className="text-[#3E4238] text-base">↑ 12% compared to previous month</div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#8B5CF6]"></div>
                <span className="text-[#133134] text-base">Referral Acquisitions</span>
              </div>
              <div className="mt-2">
                <div className="text-[#133134] text-2xl font-bold">
                  {currentMonthData?.referralAcquisitions || 0}
                </div>
                <div className="text-[#3E4238] text-base">↓ 3% compared to previous month</div>
              </div>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="month"
                  tick={{ fontSize: 12, fill: '#133134' }}
                  tickFormatter={(value, index) => {
                    const item = chartData[index];
                    return `${item.month} ${item.year}${item.isProjected ? '*' : ''}`;
                  }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#133134' }}
                  label={{ 
                    value: 'Number of Customers', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' }
                  }}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload;
                      return (
                        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                          <p className="font-semibold text-gray-900 mb-2">
                            {`${label} ${item.year}`}
                            {item.isProjected && " (Projected)"}
                          </p>
                          {payload.map((entry: any) => (
                            <div 
                              key={entry.name}
                              className="flex items-center justify-between gap-4 text-sm"
                            >
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: entry.color }}
                                />
                                <span className="capitalize">
                                  {entry.name}: {entry.value}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="newCustomers" 
                  name="New Customers"
                  fill="#0EA5E9"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="websiteAcquisitions" 
                  name="Website"
                  fill="#F97316"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="referralAcquisitions" 
                  name="Referrals"
                  fill="#8B5CF6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}