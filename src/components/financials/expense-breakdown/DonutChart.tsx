import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import { DonutChartProps } from "./types";

export function DonutChart({ data, chartSize, outerRadius, innerRadius, colors }: DonutChartProps) {
  return (
    <div className="w-full md:w-1/2 flex items-center justify-center" style={{ height: `${chartSize}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            activeShape={(props) => {
              const RADIAN = Math.PI / 180;
              const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
              const sin = Math.sin(-RADIAN * midAngle);
              const cos = Math.cos(-RADIAN * midAngle);
              const mx = cx + (outerRadius + 30) * cos;
              const my = cy + (outerRadius + 30) * sin;
              return (
                <g>
                  <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#133134">
                    {payload.category}
                  </text>
                  <text x={mx} y={my} textAnchor={cos >= 0 ? 'start' : 'end'} fill="#133134">
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                </g>
              );
            }}
          >
            {data?.map((entry, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}