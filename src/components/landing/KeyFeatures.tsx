import { 
  Sparkles, 
  WrenchIcon, 
  MapPin, 
  FileText, 
  Users,
  ChartBar
} from "lucide-react";
import { Card } from "@/components/ui/card";

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
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            From site management to guest insights, our tool provides everything you need to run your RV park smoothly and efficiently.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[200px]">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className={`
                  p-6 bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1
                  ${feature.size === 'large' ? 'md:col-span-4 md:row-span-2' : 
                    feature.size === 'medium' ? 'md:col-span-2 md:row-span-2' : 
                    'md:col-span-2 md:row-span-1'}
                  flex flex-col relative overflow-hidden group
                `}
              >
                <div className="flex items-start justify-between mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[#0D1D1F] group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}