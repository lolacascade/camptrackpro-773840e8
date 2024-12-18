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
      description: "Get actionable suggestions to optimize site usage, reduce costs, and improve operations."
    },
    {
      icon: WrenchIcon,
      title: "Maintenance Tracking",
      description: "Track and manage maintenance effortlessly with tools to log, assign, and monitor progress in real-time."
    },
    {
      icon: MapPin,
      title: "Site Management",
      description: "Organize site details, surface types, and availability for clear and easy oversight."
    },
    {
      icon: FileText,
      title: "Custom Reports",
      description: "Generate reports that offer clarity on performance, expenses, and site utilization."
    },
    {
      icon: Users,
      title: "Guest Insights",
      description: "Learn visitor trends and preferences to enhance their experience and boost satisfaction."
    },
    {
      icon: ChartBar,
      title: "Performance Analytics",
      description: "Keep track of key park metrics and performance to make data-driven decisions."
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className={`p-6 bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                  index === 3 || index === 4 ? 'md:h-[calc(100%+2rem)]' : ''
                }`}
              >
                <Icon className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2 text-[#0D1D1F]">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}