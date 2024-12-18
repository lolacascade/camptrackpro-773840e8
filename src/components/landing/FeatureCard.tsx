import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="p-4 sm:p-6 md:p-8 bg-white hover:shadow-lg transition-all duration-300 h-full border-none">
      <Icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-primary mb-3 sm:mb-4" />
      <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-[#0D1D1F]">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600">{description}</p>
    </Card>
  );
}