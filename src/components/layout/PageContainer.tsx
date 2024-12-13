import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn(
      "container mx-auto px-4 py-6",
      "min-h-[calc(100vh-4rem)]",
      className
    )}>
      <div className="bg-white rounded-[24px] p-6 md:p-12 space-y-8">
        {children}
      </div>
    </div>
  );
}