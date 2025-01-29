import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface DataTableContainerProps {
  children: ReactNode;
  className?: string;
}

export function DataTableContainer({ children, className = "" }: DataTableContainerProps) {
  return (
    <Card className={`border border-[#E8EBEB] rounded-xl bg-transparent ${className}`}>
      <div className="p-4">
        {children}
      </div>
    </Card>
  );
}