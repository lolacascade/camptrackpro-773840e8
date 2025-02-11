
import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface DataTableContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * DataTableContainer Component
 * 
 * Provides consistent styling wrapper for data tables.
 * Uses a single Card component to avoid nested cards/borders.
 */
export function DataTableContainer({ children, className = "" }: DataTableContainerProps) {
  return (
    <Card className={`border border-[#E8EBEB] rounded-xl bg-transparent ${className}`}>
      <div className="p-4">
        {children}
      </div>
    </Card>
  );
}
