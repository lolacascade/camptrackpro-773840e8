import { Card } from "@/components/ui/card";
import { 
  Sparkles, 
  WrenchIcon, 
  MapPin, 
  FileText, 
  Users,
  ChartBar
} from "lucide-react";

export function KeyFeatures() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Recommendations",
      description: "Get actionable suggestions to optimize site usage, reduce costs, and improve operations.",
      size: "large"
    },
    {
      icon: WrenchIcon,
      title: "Maintenance Tracking",
      description: "Track and manage maintenance effortlessly with tools to log, assign, and monitor progress in real-time.",
      size: "medium"
    },
    {
      icon: MapPin,
      title: "Site Management",
      description: "Organize site details, surface types, and availability for clear and easy oversight.",
      size: "medium"
    },
    {
      icon: FileText,
      title: "Custom Reports",
      description: "Generate reports that offer clarity on performance, expenses, and site utilization.",
      size: "small"
    },
    {
      icon: Users,
      title: "Guest Insights",
      description: "Learn visitor trends and preferences to enhance their experience and boost satisfaction.",
      size: "small"
    },
    {
      icon: ChartBar,
      title: "Performance Analytics",
      description: "Keep track of key park metrics and performance to make data-driven decisions.",
      size: "medium"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0D1D1F]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            All Your Operations, Simplified
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            From site management to guest insights, our tool provides everything you need to run your RV park smoothly and efficiently.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isLarge = feature.size === 'large';
            const isMedium = feature.size === 'medium';
            
            return (
              <Card 
                key={index} 
                className={`
                  relative overflow-hidden group transition-all duration-300 hover:shadow-xl
                  ${isLarge ? 'md:col-span-2 lg:col-span-2 lg:row-span-2' : 
                    isMedium ? 'lg:col-span-2' : 'lg:col-span-1'}
                  bg-white p-6 flex flex-col
                `}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="p-2 rounded-lg bg-[#0D1D1F]/5">
                    <Icon className="w-8 h-8 text-[#0D1D1F]" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#0D1D1F]">
                  {feature.title}
                </h3>
                <p className="text-base text-gray-700">
                  {feature.description}
                </p>
                <div className="mt-auto pt-4">
                  <div className="h-1 w-full bg-gradient-to-r from-[#0D1D1F] to-[#0D1D1F]/80 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}