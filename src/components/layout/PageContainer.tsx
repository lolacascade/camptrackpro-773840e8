import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0D1D1F] p-4 md:p-6">
      <div className={cn(
        "mx-auto w-full max-w-5xl",
        className
      )}>
        <div className="w-full rounded-[24px] bg-white p-4 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}