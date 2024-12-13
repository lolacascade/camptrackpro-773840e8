import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0D1D1F]">
      <div className={cn(
        "mx-auto w-full px-2 md:px-10 py-6",
        className
      )}>
        <div className="w-full rounded-[24px] bg-white p-4 md:p-8 max-w-[1400px] mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}