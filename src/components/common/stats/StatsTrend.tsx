interface StatsTrendProps {
  value: string;
  isPositive: boolean;
  comparedTo: string;
}

export function StatsTrend({ value, isPositive, comparedTo }: StatsTrendProps) {
  return (
    <div className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
      {isPositive ? '↑' : '↓'} {value} {comparedTo}
    </div>
  );
}