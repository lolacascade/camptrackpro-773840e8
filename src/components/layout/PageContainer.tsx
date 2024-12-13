import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0D1D1F] p-6">
      <div className={cn(
        "container mx-auto",
        "max-w-[1400px]",
        className
      )}>
        <div className="rounded-[24px] bg-white p-6 md:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}