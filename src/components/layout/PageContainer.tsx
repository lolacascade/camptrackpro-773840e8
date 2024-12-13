import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn(
      "bg-white rounded-[24px] min-h-[calc(100vh-6rem)]",
      "p-6 md:p-12 space-y-8",
      className
    )}>
      {children}
    </div>
  );
}