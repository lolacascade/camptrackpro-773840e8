import { CustomTooltipProps } from './types';

export function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload) return null;

  const income = payload[0]?.value || 0;
  const expenses = payload[1]?.value || 0;
  const netProfit = income - expenses;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <p className="font-semibold mb-2">{label}</p>
      <div className="space-y-1">
        <p className="text-emerald-600 flex justify-between gap-4">
          <span>Income:</span>
          <span>${income.toLocaleString()}</span>
        </p>
        <p className="text-red-600 flex justify-between gap-4">
          <span>Expenses:</span>
          <span>${expenses.toLocaleString()}</span>
        </p>
        <div className="border-t border-gray-200 mt-2 pt-2">
          <p className={`flex justify-between gap-4 font-medium ${netProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            <span>Net Profit:</span>
            <span>${netProfit.toLocaleString()}</span>
          </p>
        </div>
      </div>
    </div>
  );
}