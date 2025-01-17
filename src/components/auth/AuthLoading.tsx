import { Loader2 } from "lucide-react";

export function AuthLoading() {
  return (
    <div className="min-h-screen bg-[#0D1D1F] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-white text-sm">Loading authentication...</p>
      </div>
    </div>
  );
}