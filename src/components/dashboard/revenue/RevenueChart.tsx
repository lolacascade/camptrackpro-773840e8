import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
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
import { RevenueCategory, RevenueData, Annotation } from "./types";
import { format } from "date-fns";
import { useRevenueAnnotations } from "./useRevenueAnnotations";

interface RevenueChartProps {
  data: RevenueData[];
  selectedCategory: RevenueCategory;
}

export function RevenueChart({ data, selectedCategory }: RevenueChartProps) {
  const isMobile = useIsMobile();
  const annotations = useRevenueAnnotations();
  
  const averageRevenue = data?.reduce((acc, curr) => 
    acc + (curr.slipRenewals + curr.newSlipRentals + curr.maintenanceServices), 0
  ) / (data?.length || 1);

  return (
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
          <Tooltip content={<CustomTooltip annotations={annotations} />} />
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
  );
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  annotations: Annotation[];
}

function CustomTooltip({ active, payload, label, annotations }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const annotation = annotations.find(a => 
    a.month === format(payload[0].payload.date, 'MMM yyyy')
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-[#BFC6B3]/20 text-base">
      <p className="font-bold text-[#0D1D1F]">{`${label} ${payload[0]?.payload.year}`}</p>
      {payload.map((entry, index) => (
        <p key={index} className="text-[#0D1D1F]">
          <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
          {`${entry.name === "slipRenewals" ? "Slip Renewals" :
             entry.name === "newSlipRentals" ? "New Rentals" :
             "Maintenance"}: $${entry.value.toLocaleString()}`}
        </p>
      ))}
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