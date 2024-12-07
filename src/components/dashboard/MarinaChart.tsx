import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

interface DockStats {
  dock: string;
  total: number;
  occupied: number;
  available: number;
  maintenance: number;
}

interface MarinaChartProps {
  chartData: DockStats[];
}

export function MarinaChart({ chartData }: MarinaChartProps) {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dock" tick={{ fontSize: 16 }} />
          <YAxis tick={{ fontSize: 16 }} />
          <RechartsTooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-4 rounded-lg shadow-lg border text-base">
                    <p className="font-bold text-[#133134]">{`Dock ${label}`}</p>
                    <p className="text-[#133134]">{`Total Slips: ${payload[0].payload.total}`}</p>
                    <p className="text-[#133134]">{`Occupied: ${payload[0].payload.occupied}`}</p>
                    <p className="text-[#133134]">{`Available: ${payload[0].payload.available}`}</p>
                    <p className="text-[#133134]">{`Maintenance: ${payload[0].payload.maintenance}`}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey="total"
            fill="#C0CCAB"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}