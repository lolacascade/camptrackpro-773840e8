import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="p-6 bg-accent hover:shadow-lg transition-all duration-300 h-full">
      <Icon className="w-8 h-8 md:w-12 md:h-12 text-primary mb-4" />
      <h3 className="text-lg md:text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm md:text-base text-muted-foreground">{description}</p>
    </Card>
  );
}