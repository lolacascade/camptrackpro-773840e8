import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-[#133134]">Marina Dashboard</h1>
      <div className="flex gap-2">
        <span className="text-sm text-[#3E4238]">
          Last updated: {new Date().toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}