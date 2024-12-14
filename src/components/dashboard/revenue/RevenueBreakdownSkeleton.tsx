import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RevenueBreakdownSkeleton() {
  return (
    <Card className="col-span-2 border border-[#E8EBEB] rounded-xl bg-transparent mb-8">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <CardTitle className="text-[#0D1D1F] text-2xl">Revenue Breakdown</CardTitle>
        <div className="h-10 w-[200px] bg-gray-200 animate-pulse rounded-md" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-6 w-24 bg-gray-200 animate-pulse rounded" />
              <div className="h-8 w-32 bg-gray-200 animate-pulse rounded" />
              <div className="h-4 w-40 bg-gray-200 animate-pulse rounded" />
            </div>
          ))}
        </div>
        <div className="h-[300px] bg-gray-200 animate-pulse rounded-lg" />
      </CardContent>
    </Card>
  );
}